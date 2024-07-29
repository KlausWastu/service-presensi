const { Presensi } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { id } = req.params;
  const schema = {
    catatan: "string|optional",
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
    catatan: req.body.catatan,
  };

  const presensiUser = await Presensi.findByPk(id);
  if (!presensiUser) {
    return res.json({
      Status: "error",
      message: "data presensi tidak ditemukan!",
      data: {},
    });
  }

  await presensiUser.update(data);

  return res.json({
    status: "success",
    message: "catatan berhasil ditambahkan!",
    data: {
      id: presensiUser.id,
      absen_masuk: presensiUser.absen_masuk,
      absen_keluar: presensiUser.absen_keluar,
      catatan: data.catatan,
    },
  });
};
