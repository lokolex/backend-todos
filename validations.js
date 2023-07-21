const { body } = require('express-validator');

const registerValidation = [
  body('userName', 'Укажите имя не менее 2 и не более 15 символов')
    .notEmpty()
    .isLength({ min: 2, max: 15 }),
  body('email', 'Введен невалидный email').notEmpty().isEmail(),
  body('password', 'Пароль должен содержать не менее 5-ти символов')
    .notEmpty()
    .isLength({ min: 5 }),
];

const loginValidation = [
  body('email', 'Введен невалидный email').notEmpty().isEmail(),
  body('password', 'Пароль должен содержать не менее 5-ти символов')
    .notEmpty()
    .isLength({ min: 5 }),
];

const todoAddValidation = [
  body('text', 'Введите текст не менее 5 и не более 100 символов')
    .notEmpty()
    .trim()
    .isLength({ min: 5, max: 100 })
    .isString(),
];

const todoEditDoneValidation = [
  body('done', 'Передайте boolean значение done').notEmpty().isBoolean(),
];

module.exports = {
  registerValidation,
  loginValidation,
  todoAddValidation,
  todoEditDoneValidation,
};
