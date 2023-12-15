const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv");

const passwordToHash = async (password) => {
  return await bcrypt.hash(password, 10);
};
const passwordHashCompare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAccessToken = (user) => {
  return JWT.sign(
    { name: user.uuid, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1w" }
  );
};

const generateRefreshToken = (user) => {
  return JWT.sign(
    { name: user.uuid, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

module.exports = {
  passwordHashCompare,
  generateAccessToken,
  generateRefreshToken,
  passwordToHash,
};
