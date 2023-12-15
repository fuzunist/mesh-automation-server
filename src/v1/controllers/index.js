const login = require("./loginController");
const register = require("./registerController");
const {
  createKesme,
  deleteKesme,
  deleteAllKesme,
} = require("./kesmeController");

module.exports = { login, register, createKesme, deleteKesme, deleteAllKesme };
