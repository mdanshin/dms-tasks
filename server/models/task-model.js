import mongoose from 'mongoose'

const { Schema, model } = mongoose

const TaskSchema = new Schema({
  name: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  summary: { type: String, default: '' },
  description: { type: String, default: '' },
  plannedFinishDate: { type: Date }, // новое поле: дата планируемого завершения
  priority: {
    type: String,
    enum: ['high', 'middle', 'low'],
    default: 'middle'
  }
})

export default model('Task', TaskSchema)
