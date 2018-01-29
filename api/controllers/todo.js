const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const errors = require('http-errors')

router.route('/todo')
  .post((req, res, next) => {
    const todo = new Todo(req.body)
    todo.save()
      .then(todo => {
        res.json(todo)
      })
      .catch(next)
  })
  .get((req, res, next) => {
    Todo.find({}).exec()
      .then(todos => {
        res.json(todos)
      })
      .catch(next)
  })

router.route('/todo/:id')
  .get((req, res, next) => {
    const notFound = errors(404, `Could not find todo for ${req.params.id}`)
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return next(notFound)
    Todo.findById(req.params.id).exec()
      .then(todo => {
        if (todo) res.json(todo)
        else next(notFound)
      })
      .catch(next)
  })

module.exports = router