module.exports = (sequelize, DataTypes) => {
  const Presensi = sequelize.define(
    "Presensi",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      absen_masuk: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      absen_keluar: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      catatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lokasi_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        field: "deleted_at",
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "presensis",
      paranoid: true,
      timestamps: true,
    }
  );
  return Presensi;
};
