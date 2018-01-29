const mongoose = require('mongoose')
const {Schema} = mongoose

const TodoSchema = new Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  due: Date
})

TodoSchema.plugin(require('mongoose-sanitizer'))     // sanitizes HTML before saving to db
TodoSchema.plugin(require('mongoose-sanitize-json')) // Removes Mongo virtual fields from JSON

module.exports = mongoose.model('Todo', TodoSchema)