const { LokasiKerja } = require("../../../models");
const Validator = require("fastest-validator");

const v = new Validator();

const users = [
  { id: 1, name: "Sugiarto", email: "suqiartoG@gmail.com" },
  { id: 2, name: "Kaleb", email: "kaleB@gmail.com" },
  { id: 3, name: "Budi", email: "BuDi@gmail.com" },
];
const lokasiKerjaSPJT = [
  { id: 1, name: "Kantor SPJT Semarang" },
  { id: 2, name: "Pabrik & Gudang Pati" },
  { id: 3, name: "Gudang Brebes" },
];

module.exports = async (req, res) => {
  const { id } = req.params;
  const schema = {
    user_id: "number|empty:false",
    lokasi_kerja: "number|empty:false",
    is_anywhere: "boolean|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.json({
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

  const lokasiKerja = await LokasiKerja.findByPk(id);
  if (!lokasiKerja) {
    return res.json({
      status: "error",
      message: "lokasi kerja user tidak ditemukan",
      data: {},
    });
  }

  const lokasi = lokasiKerjaSPJT.find(
    (lokasi) => lokasi.id === data.lokasi_kerja
  );
  if (!lokasi) {
    return res.json({
      status: "error",
      message: "lokasi belum ditambahkan!",
      data: {},
    });
  }

  await lokasiKerja.update(data);

  return res.json({
    status: "success",
    message: "lokasi berhasil diubah!",
    data: {
      id: lokasiKerja.id,
      user_id: data.user_id,
      lokasi_kerja: data.lokasi_kerja,
      is_anywhere: data.is_anywhere,
    },
  });
};
