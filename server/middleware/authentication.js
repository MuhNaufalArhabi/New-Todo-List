const { jwtVerify } = require("../helpers");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalidLogin" };
    }

    const payload = jwtVerify(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "invalidLogin" };
    }
    req.user = { id: user.id, email: user.email };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication
