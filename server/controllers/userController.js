const { User, Category } = require("../models");
const { hashPass, comparePass, jwtSign } = require("../helpers");

class UserController {
  static async create(req, res, next) {
    try {
      const { name, phone, email, username, password } = req.body;
      const hashpass = hashPass(password);
      const user = await User.create({
        name,
        phone,
        email,
        username,
        password: hashpass,
      });
      const category = [
        {
          name: "Work",
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          userId: user.id,
        },
        {
          name: "Sport",
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          userId: user.id,
        },
        {
          name: "Groceries",
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          userId: user.id,
        },
        {
          name: "Study",
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          userId: user.id,
        },
      ];
      await Category.bulkCreate(category);

      res.status(201).json({ message: "Succes create account" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      console.log(user);
      if (!user) {
        throw { name: "invalidLogin" };
      }
      console.log(comparePass(password, user.password));
      if (!comparePass(password, user.password)) {
        throw { name: "invalidLogin" };
      }
      const access_token = jwtSign({ id: user.id });
      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
