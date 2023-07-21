require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'Недействительный email' });
    }

    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      name: userName,
      email,
      password: hash,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '5d',
      }
    );

    const newUser = await User.findOneAndUpdate({ email }, { token }, { new: true });

    const { password: pass, todos, __v, ...userData } = newUser._doc;

    res.json({
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось зарегистрироваться' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user._doc.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '5d',
      }
    );

    const newUser = await User.findOneAndUpdate({ email }, { token }, { new: true });

    const { password: pass, todos, __v, ...userData } = newUser._doc;

    res.json({
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -todos -__v');
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    res.json(user._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
