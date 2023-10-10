const { Category } = require("../models");

class CategoryController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      await Category.create({name, color, 'userId': req.user.id})
      res.status(201).json({message: 'Succes create category'})
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next){
    try {
        const category = await Category.findAll({where: { userId: req.user.id}})
        res.status(200).json(category)
    } catch (error) {
        next(error)
    }
  }

  static async findOne(req, res, next){
    try {
        const id = req.params.id
        const category = await Category.findOne(id)
        if(!category){
            throw { name: 'notFound'}
        }
        res.status(200).json(category)
    } catch (error) {
        next(error)
    }
  }

  static async delete (req, res, next){
    try {
        const id = req.params.id
        await Category.destroy({where: {id}})
        res.status(200).json({message: 'Succes delete category'})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = CategoryController