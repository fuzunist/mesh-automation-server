const httpStatus = require("http-status/lib");
const {passwordToHash}= require("../utils/helpers")
const { insert } = require("../services/userServices");
const create = async (req, res) => {
  insert({
    ...req.body,
    hashedPassword: await passwordToHash(req.body.Password),
  })
    .then(({ rows }) => res.status(httpStatus.CREATED).send(rows[0]))
    .catch((e) => {
      if (e.constraint === "unique_username")
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: "Username already exists" });
      if (e.constraint === "unique_email")
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: "Email already exists" });
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e });
    });
};

module.exports = create;
