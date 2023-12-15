const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers");
const { authenticate, validate, verify } = require("../middlewares");
const schemas = require("../validations/userValidations");

router.route("/").get(authenticate, verify);
//validate(schemas.loginValidation), hata veriyor eklenince
router.route("/login").post(login);
router.route("/register").post(register);
// router.route('/').put(authenticate, validate(schemas.updateValidation), put)
// router.route('/').delete(authenticate, remove)

module.exports = router;
