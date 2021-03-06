import mongoose from 'mongoose'

const { Schema, model } = mongoose

const TaskSchema = new Schema({
  name: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  summary: { type: String, default: '' },
  description: { type: String, default: '' },
})

export default model('Task', TaskSchema)
