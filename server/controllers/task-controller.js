import taskService from '../services/task-service.js'

class TaskController {
  async addTask(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).json({ message: 'No task data provided' })
      }
      const result = await taskService.addTask(req.body)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async updateTask(req, res, next) {
    try {
      const id = req.params.id
      const updatedTask = await taskService.updateTask(id, req.body)
      return res.json(updatedTask)
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
    try {
      const id = req.params.id
      const task = await taskService.getTaskById(id)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      return res.json(task)
    } catch (e) {
      next(e)
    }
  }

  async completeTask(req, res, next) {
    try {
      const id = req.params.id
      const task = await taskService.completeTask(id, req.body)
      return res.json(task)
    } catch (e) {
      next(e)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const id = req.params.id
      const deletedTask = await taskService.deleteTask(id)
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' })
      }
      return res.json({ message: 'Task deleted', task: deletedTask })
    } catch (e) {
      next(e)
    }
  }
}

export default new TaskController()
