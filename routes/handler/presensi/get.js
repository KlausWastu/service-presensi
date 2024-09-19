const { Op } = require("sequelize");
const { Presensi, Sequelize } = require("../../../models");

module.exports = async (req, res) => {
  const presensiIds = req.query.pesensi_id || [];
  const presensiUserIds = req.query.presensi_user_id || [];
  const presensiMonthUserIds = req.query.presensi_month_user || [];
  // Ex presensiMonthUserIds = 2024-08

  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;

  if (currentPage % 1 !== 0 || perPage % 1 !== 0) {
    return res.status(404).json({
      status: "error",
      message: "page/perPage must be integer",
      data: {},
    });
  }

  if (parseInt(currentPage, 10) <= 0 || parseInt(perPage, 10) <= 0) {
    return res.status(404).json({
      status: "error",
      message: "page/perPage must be greater than 0",
      data: {},
    });
  }

  const limit = parseInt(perPage, 10);
  const offset = (parseInt(currentPage, 10) - 1) * parseInt(perPage, 10);

  const sqlOptions = {
    attribute: [
      "id",
      "user_id",
      "absen_masuk",
      "absen_keluar",
      "catatan",
      "lokasi_link",
      "latitude",
      "longitude",
      "createdAt",
    ],
    limit,
    offset,
  };

  if (presensiIds.length) {
    sqlOptions.where = {
      id: presensiIds,
    };
  }

  if (presensiUserIds.length) {
    sqlOptions.where = {
      user_id: presensiUserIds,
    };
  }

  if (presensiMonthUserIds.length) {
    const [year, month] = presensiMonthUserIds.split("-");
    sqlOptions.where = {
      ...sqlOptions.where,
      createdAt: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("created_at")),
            year
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("created_at")),
            month
          ),
        ],
      },
    };
  }

  const presensiUser = await Presensi.findAndCountAll(sqlOptions);

  const totalData = presensiUser.count;
  const totalPage = Math.ceil(presensiUser.count / perPage);
  let countPerPage = 0;
  if (currentPage < totalPage) {
    countPerPage = perPage;
  } else if (currentPage == totalPage) {
    countPerPage = presensiUser.count % perPage;
    if (countPerPage == 0) countPerPage = perPage;
  }

  return res.json({
    status: "success",
    message: "data absen berhasil ditemukan!",
    data: {
      presensi: presensiUser.rows,
      total_data: totalData,
      current_rows: parseInt(countPerPage, 10),
      per_page: parseInt(perPage, 10),
      current_page: parseInt(currentPage, 10),
      total_page: totalPage,
    },
  });
};
