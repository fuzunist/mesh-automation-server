const express = require("express");
const router = express.Router();
const { authenticate, validate, verify } = require("../middlewares");
const { createKesme, deleteKesme, deleteAllKesme } = require("../controllers");
const { getAllKesme } = require("../controllers/kesmeController");

router.route("/").get(authenticate, getAllKesme);
router.route("/").post(authenticate, createKesme);
router.route("/:id").delete(authenticate, deleteKesme);
router.route("/delete/all").delete(authenticate, deleteAllKesme);

module.exports = router;
