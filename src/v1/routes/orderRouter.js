


const express = require("express");
const router = express.Router();
const { authenticate, validate, verify } = require("../middlewares");
const { createOrder, deleteOrder, deleteAllOrder, updateOrder } = require("../controllers");
const { getAllOrder } = require("../controllers/orderController");


router.route("/").get(authenticate, getAllOrder);
router.route("/").post(authenticate, createOrder);
router.route("/:id").delete(authenticate, deleteOrder);
router.route("/:id").put(authenticate, updateOrder);
router.route("/delete/all").delete(authenticate, deleteAllOrder);


module.exports = router;



