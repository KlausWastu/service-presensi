const { LokasiKerja } = require("../../../models");
const Validator = require("fastest-validator");

const v = new Validator();

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
  },
  {
    id: 2,
    name: "Pabrik & Gudang Pati",
    lokasi: "https://maps.app.goo.gl/ibJLmd6DBkoLsgQD7",
  },
  {
    id: 3,
    name: "Gudang Brebes",
    lokasi: "https://maps.app.goo.gl/GnEXQtNTLSihY31C9",
  },
];

module.exports = async (req, res) => {
  const schema = {
    user_id: "number|empty:false",
    lokasi_kerja: "number|empty:false",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
      data: {},
    });
  }

  const data = {
    user_id: req.body.user_id,
    lokasi_kerja: req.body.lokasi_kerja,
    is_anywhere: req.body.is_anywhere,
  };

  const user = users.find((user) => user.id === data.user_id);
  console.log("User> ", user);
  if (!user) {
    return res.json({
      status: "error",
      message: "user tidak ditemukan",
    });
  }

  const lokasi = lokasiKerjaSPJT.find(
    (lokasi) => lokasi.id === data.lokasi_kerja
  );
  console.log("Lokasi> ", lokasi);
  if (!lokasi) {
    return res.json({
      status: "error",
      message: "lokasi belum ditambahkan",
    });
  }

  //   const user = await LokasiKerja.find((lokasi) => )

  const createdLokasiKerja = await LokasiKerja.create(data);

  return res.json({
    status: "success",
    message: "lokasi kerja berhasil dibuat!",
    data: {
      lokasiKerja: {
        id: createdLokasiKerja.id,
        user_id: data.user_id,
        lokasi_kerja: data.lokasi_kerja,
        is_anywhere: createdLokasiKerja.is_anywhere,
      },
    },
  });
};
