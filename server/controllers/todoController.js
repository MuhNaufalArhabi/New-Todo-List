const { Todo, Category} = require("../models");

class TodoController {
  static async create(req, res, next) {
    try {
      const { name, categoryId } = req.body;
      const todo = await Todo.create({ name, userId: req.user.id, categoryId });
      res.status(201).json({ message: "Succes create todo" });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const todo = await Todo.findAll({
        where: {
          userId: req.user.id,
        },
        include: ['Category'],
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.status(200).json(todo)
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next){
    try {
      const todo = await Todo.findOne(req.params.id)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  static async findByCategory(req, res, next){
    try {
      const {categoryId} = req.params
      const category = await Category.findAll({
        where: { userId: req.user.id, id: categoryId}
      })

      console.log(category, '<<<<<<')
      if(category.length === 0){
        throw {name: 'notFound'}
      }
      const todo = await Todo.findAll({
        where: { categoryId },
        include: ['Category']
      })
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next){
    try {
      const {status}= req.body
      await Todo.update(status, {
        where: {id: req.params.id}
      })
      res.status(200).json({'message': 'Succes change status'})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next){
    try {
      await Todo.destroy({where:{id: req.params.id}})
      res.status(200).json({message: "Succes delete Todo"})
    } catch (error) {
      next(error)
    }
  }
}


module.exports = TodoController