const express = require("express");
const router = express.Router();

const presensiHandler = require("./handler/presensi");

router.get("/", presensiHandler.get);
router.post("/", presensiHandler.absenMasuk);
router.put("/", presensiHandler.absenKeluar);
router.put("/ubah-catatan/:id", presensiHandler.update);
router.delete("/:id", presensiHandler.destroy);

module.exports = router;
