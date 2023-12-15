const httpStatus = require("http-status/lib");
const {
  generateAccessToken,
  generateRefreshToken,
  passwordHashCompare,
} = require("../utils/helpers");
const { loginUser } = require("../services/userServices");

const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Hata! Geçersiz giriş. Kullanıcı adı ve şifre gerekli.",
      });
    }

    const { rows } = await loginUser(Username);
    if (!rows[0]) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ error: "Hata! Kullanıcı bulunamadı." });
    }
    const hashedPassword = await passwordHashCompare(
      Password,
      rows[0].passwordhash
    );
    if (hashedPassword) {
      const user = { ...rows[0] };
      delete user.passwordhash;
      user.tokens = {
        access_token: generateAccessToken(user),
        refresh_token: generateRefreshToken(user),
      };
      return res.status(httpStatus.OK).send(user);
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: "Geçersiz Şifre" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Sunucu Hatası" });
  }
};

module.exports = login;
