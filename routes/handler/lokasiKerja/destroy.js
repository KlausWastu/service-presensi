const { LokasiKerja } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;

  const lokasiKerjaUser = await LokasiKerja.findByPk(id);
  if (!lokasiKerjaUser) {
    return res.json({
      status: "error",
      message: "lokasi kerja user tidak ditemukan!",
    });
  }

  await lokasiKerjaUser.destroy();

  return res.json({
    status: "success",
    message: "lokasi kerja user berhasil dihapus!",
    data: {},
  });
};
