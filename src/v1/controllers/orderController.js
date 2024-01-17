


const { insert, del, delAll, getAll, update } = require("../services/orderServices");
const httpStatus = require("http-status/lib");


const createOrder = (req, res) => {
 const userId = req.user.uuid;
 insert({ ...req.body, userId: userId })
   .then(({ rows }) => res.status(httpStatus.OK).send(rows[0]))
   .catch((e) => {
     console.error("Error in createOrder:", e); // More detailed logging
     res
       .status(httpStatus.INTERNAL_SERVER_ERROR)
       .send({ error: "An error occurred." });
   });
};


const updateOrder = (req, res) => {
  const userId = req.user.uuid;
  const order_id = req.params.id;

  // Log incoming request parameters and body
  console.log("Received updateOrder request with userId:", userId);
  console.log("Order ID to update:", order_id);
  console.log("Order data received:", req.body);
  

  update({ order_id: Number(order_id), ...req.body, userId: userId })
    .then(({ rows }) => {
      console.log("Order updated successfully:", rows[0]);
      res.status(httpStatus.OK).send(rows[0]);
    })
    .catch((e) => {
      console.error("Error in updateOrder:", e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "An error occurred." });
    });
};





const deleteOrder = (req, res) => {
 const userId = req.user.uuid;
 del({ order_id: Number(req.params.id), userId: userId })
   .then(({ rowCount }) => {
     if (!rowCount)
       return res
         .status(httpStatus.BAD_REQUEST)
         .send({ error: "There is no such record." });
     res.status(httpStatus.OK).send({ message: "Successfully deleted" });
   })
   .catch((err) => {
     console.log(err);
     res
       .status(httpStatus.INTERNAL_SERVER_ERROR)
       .send({ error: "An error onccurred." });
   });
};


const deleteAllOrder = (req, res) => {
 const userId = req.user.uuid;
 delAll({ userId })
   .then(({ rowCount }) => {
     if (!rowCount)
       return res
         .status(httpStatus.BAD_REQUEST)
         .send({ error: "There is no such record." });
     res.status(httpStatus.OK).send({ message: "Successfully deleted" });
   })
   .catch(() =>
     res
       .status(httpStatus.INTERNAL_SERVER_ERROR)
       .send({ error: "An error onccurred." })
   );
};


const getAllOrder = (req, res) => {
 const userId = req.user.uuid;
 getAll({ userId: userId })
   .then(({ rows }) => {
       res.status(httpStatus.OK).send(rows)
   })
   .catch((err) => {
     console.log(err);
     res
       .status(httpStatus.INTERNAL_SERVER_ERROR)
       .send({ error: "An error occurred." });
   });
};
module.exports = { createOrder, deleteOrder, deleteAllOrder, getAllOrder, updateOrder };



