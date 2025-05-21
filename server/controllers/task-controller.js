import taskService from '../services/task-service.js'

class TaskController {
  async addTask(req, res, next) {
    try {
      const result = await taskService.addTask(req.body.body)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async updateTask(req, res, next) {
    try {
      const id = req.params.id
      await taskService.updateTask(id, req.body.body)
    } catch (e) {
      next(e)
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks()
      return res.json(tasks)
    } catch (e) {
      next(e)
    }
  }

  async getTaskById(req, res, next) {
    const id = req.params.id

    try {
      const task = await taskService.getTaskById(id)
      return res.json(task)
    } catch (e) {
      next(e)
    }
  }

  async completeTask(req, res, next) {
    try {
      const id = req.params.id
      const task = await taskService.completeTask(id, req.body.body)
      return res.json(task)
    } catch (e) {
      next(e)
    }
  }
}

export default new TaskController()
