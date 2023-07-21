const { Router } = require('express');

const checkAuth = require('../middlewares/checkAuth');
const { todoAddValidation, todoEditDoneValidation } = require('../validations');
const handleValidationErrors = require('../middlewares/handleValidationErrors');
const TodoController = require('../controllers/TodoController');

const router = Router();

router.get('/', checkAuth, TodoController.getTodos);

router.post('/', checkAuth, todoAddValidation, handleValidationErrors, TodoController.postTodo);

router.delete('/:idTodo', checkAuth, TodoController.removeTodo);

router.patch(
  '/editDone/:idTodo',
  checkAuth,
  todoEditDoneValidation,
  handleValidationErrors,
  TodoController.updateDoneTodo
);

module.exports = router;
