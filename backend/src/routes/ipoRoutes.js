const express = require("express");
const controller = require("../controllers/ipoController");

const router = express.Router();

router.get("/", controller.listIpos);
router.get("/:id/gmp", controller.getGmpHistory);
router.get("/:id", controller.getIpo);

module.exports = router;
