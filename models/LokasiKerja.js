module.exports = (sequelize, DataTypes) => {
  const LokasiKerja = sequelize.define(
    "LokasiKerja",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lokasi_kerja: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_anywhere: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      timestamps: true,
      tableName: "lokasi-kerja-users",
      paranoid: true,
    }
  );
  return LokasiKerja;
};
