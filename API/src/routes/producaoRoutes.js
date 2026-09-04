const express = require("express");
const router = express.Router();
const producaoController = require("../controllers/producaoController");

router.get("/", producaoController.listarProducoes);
router.post("/", producaoController.registrarProducao);

module.exports = router;