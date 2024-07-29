const { Presensi } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;
  const presensiUser = await Presensi.findByPk(id);

  if (!presensiUser) {
    return res.json({
      status: "error",
      message: "data presensi tidak ditemukan!",
      data: {},
    });
  }

  await presensiUser.destroy();

  return res.json({
    status: "success",
    message: "presensi berhasil dihapus!",
  });
};
