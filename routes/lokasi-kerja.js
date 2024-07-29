const express = require("express");
const router = express.Router();
const lokasiKerjaHandler = require("./handler/lokasiKerja");

/* GET users listing. */
router.get("/", lokasiKerjaHandler.get);
router.post("/", lokasiKerjaHandler.create);
router.put("/ubah/:id", lokasiKerjaHandler.update);
router.delete("/:id", lokasiKerjaHandler.destroy);

module.exports = router;
