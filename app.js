const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const lokasiKerjaRouter = require("./routes/lokasi-kerja");
const presensiRouter = require("./routes/presensi");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/lokasi-kerja-user", lokasiKerjaRouter);
app.use("/presensi", presensiRouter);

module.exports = app;
