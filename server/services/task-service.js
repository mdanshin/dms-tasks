import TaskModel from '../models/task-model.js'

class TaskService {
  async addTask(data) {
    const { body } = data
    if (!body || !body.name) {
      throw new Error('Task name is required')
    }
    try {
      const task = await TaskModel.create({ ...body })
      return task
    } catch (e) {
      throw e
    }
  }

  async getTasks() {
    const tasks = await TaskModel.find()
    return tasks
  }

  async updateTask(id, data) {
    const { body } = data
    const { _id, ...updateData } = body
    return TaskModel.findByIdAndUpdate(id, updateData, { new: true })
  }

  async getTaskById(id) {
    const task = await TaskModel.findById(id)
    return task
  }

  async completeTask(id, data) {
    const { body } = data
    const { _id, ...updateData } = body
    return TaskModel.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteTask(id) {
    //не реализовано на фронте
    return TaskModel.findByIdAndDelete(id)
  }
}

export default new TaskService()
