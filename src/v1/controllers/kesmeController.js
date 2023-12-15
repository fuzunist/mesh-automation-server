const { insert, del, delAll, getAll } = require("../services/kesmeServices");
const httpStatus = require("http-status/lib");

const createKesme = (req, res) => {
  const userId = req.user.uuid;
  insert({ ...req.body, userId: userId })
    .then(({ rows }) => res.status(httpStatus.OK).send(rows[0]))
    .catch((e) => {
      console.log(e);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "An error occurred." });
    });
};

const deleteKesme = (req, res) => {
  const userId = req.user.uuid;
  del({ kesme_id: Number(req.params.id), userId: userId })
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

const deleteAllKesme = (req, res) => {
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

const getAllKesme = (req, res) => {
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
module.exports = { createKesme, deleteKesme, deleteAllKesme, getAllKesme };
