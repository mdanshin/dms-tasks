import TaskModel from '../models/task-model.js'

class TaskService {
  async addTask(data) {
    try {
      const task = await TaskModel.create({ ...data.body })
      return task
    } catch (e) {
      throw new Error(e)
    }
  }

  async getTasks() {
    const tasks = await TaskModel.find()
    return tasks
  }

  async updateTask(id, data) {
    await TaskModel.findOneAndUpdate({ "_id": id }, { ...data.body })
  }

  async getTaskById(id) {
    const task = await TaskModel.findById(id)
    return task
  }

  async completeTask(id, data) {
    await TaskModel.findOneAndUpdate({ "_id": id }, { ...data.body })
  }
}

export default new TaskService()
