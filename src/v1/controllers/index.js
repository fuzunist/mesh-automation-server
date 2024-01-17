

const login = require("./loginController");
const register = require("./registerController");
const {
 createKesme,
 deleteKesme,
 deleteAllKesme,
} = require("./kesmeController");


const {
 createOrder,
 updateOrder,
 deleteOrder,
 deleteAllOrder,
} = require("./orderController");


module.exports = { login, register, createKesme, deleteKesme, deleteAllKesme, createOrder, updateOrder, deleteOrder, deleteAllOrder };



