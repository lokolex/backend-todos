const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    todos: [
      {
        text: String,
        done: Boolean,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.addTodo = function (text) {
  const newTodo = {
    text,
    done: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  this.todos = [...this.todos, newTodo];
  return this.save();
};

UserSchema.methods.removeTodo = function (id) {
  const todos = [...this.todos];
  const filtredTodos = todos.filter((todo) => todo._id.toString() !== id.toString());
  this.todos = [...filtredTodos];
  return this.save();
};

UserSchema.methods.updateTodo = function (id, value) {
  const todos = [...this.todos];
  const updatedTodos = todos.map((todo) => {
    if (todo._id.toString() === id.toString()) {
      return { ...todo, done: value, updatedAt: Date.now() };
    }
    return todo;
  });
  this.todos = [...updatedTodos];
  return this.save();
};

module.exports = model('User', UserSchema);
