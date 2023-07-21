const User = require('../models/UserModel');

const getTodos = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { todos } = user._doc;
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить список todo',
    });
  }
};

const postTodo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    await user.addTodo(req.body.text);
    const { todos } = user._doc;
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать todo',
    });
  }
};

const removeTodo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    await user.removeTodo(req.params.idTodo);
    const { todos } = user._doc;
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить todo',
    });
  }
};

const updateDoneTodo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    await user.updateTodo(req.params.idTodo, req.body.done);
    const { todos } = user._doc;
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить todo',
    });
  }
};

module.exports = {
  getTodos,
  postTodo,
  removeTodo,
  updateDoneTodo,
};
