const { Presensi, LokasiKerja } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

const moment = require("moment-timezone");

function Jarak(latitude1, longitude1, latitude2, longitude2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  let theta = longitude1 - longitude2;
  let dist =
    Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2)) +
    Math.cos(deg2rad(latitude1)) *
      Math.cos(deg2rad(latitude2)) *
      Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = dist * (180 / Math.PI);
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344 * 1000;

  return dist;
}

// Contoh Data
const users = [
  { id: 1, name: "Sugiarto", email: "suqiartoG@gmail.com" },
  { id: 2, name: "Kaleb", email: "kaleB@gmail.com" },
  { id: 3, name: "Budi", email: "BuDi@gmail.com" },
];
const lokasiKerjaSPJT = [
  {
    id: 1,
    name: "Kantor SPJT Semarang",
    lokasi: "https://maps.app.goo.gl/yEdvFyPoxQBUMTiPA",
    latitude: "-6.989171",
    longitude: "110.3931218",
  },
  {
    id: 2,
    name: "Pabrik & Gudang Pati",
    lokasi: "https://maps.app.goo.gl/ibJLmd6DBkoLsgQD7",
    latitude: "-6.6999141",
    longitude: "111.2547014",
  },
  {
    id: 3,
    name: "Gudang Brebes",
    lokasi: "https://maps.app.goo.gl/GnEXQtNTLSihY31C9",
    latitude: "-6.8122113",
    longitude: "108.8028188",
  },
];

module.exports = async (req, res) => {
  const schema = {
    user_id: "number|empty:false",
    latitude: "string|empty:false",
    longitude: "string|empty:false",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(500).json({
      status: "error",
      message: validate,
      data: {},
    });
  }

  const waktu = new Date();
  const waktuIndonesia = moment(waktu)
    .tz("Asia/Jakarta")
    .format("YYYY-MM-DD HH:mm:ss");

  const data = {
    user_id: req.body.user_id,
    absen_keluar: waktuIndonesia,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  //   console.log("Latitude >> ", data.latitude);
  //   console.log("Longitude >> ", data.longitude);

  const user = await Presensi.findOne({
    where: { user_id: data.user_id },
    order: [["absen_masuk", "DESC"]],
  });

  const lokasiKerjaUser = await LokasiKerja.findOne({
    where: { user_id: data.user_id },
  });
  const lokasiKerja = lokasiKerjaSPJT.find(
    (lokasi) => lokasi.id === lokasiKerjaUser.lokasi_kerja
  );

  let latitudeLokasiKerja = lokasiKerja.latitude;
  let longitudeLokasiKerja = lokasiKerja.longitude;

  let result = Math.round(
    Jarak(
      latitudeLokasiKerja,
      longitudeLokasiKerja,
      data.latitude,
      data.longitude
    )
  );
  //   console.log("Result >> ", result);

  if (result > 100) {
    return res.json({
      status: "gagal",
      message: `Maaf Anda Gagal Absen, Karena Berada 100 meter lebih dari ${lokasiKerja.name}`,
      data: result,
    });
  } else {
    await user.update({ absen_keluar: data.absen_keluar });

    return res.json({
      status: "success",
      message: "yey, anda berhasil absen pulang!",
      data: {
        id: user.id,
        absen_masuk: user.absen_masuk,
        absen_keluar: data.absen_keluar,
      },
    });
  }
};
