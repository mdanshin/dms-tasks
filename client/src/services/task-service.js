import $api from '../http/index'

export default class TaskService {
  static async getTasks() {
    try {
      return await $api.get('/tasks')
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }

  static async getTaskById(id) {
    try {
      return await $api.get(`/tasks/${id}`)
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }

  static async addTask(data) {
    try {
      const task = await $api.post('/tasks', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      return task
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }

  static async udateTask(id, data) {
    try {
      return await $api.put('/tasks/' + id, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }

  static async completeTask(id, data) {
    try {
      return await $api.patch('/tasks/' + id + '/complete', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
    } catch (error) {
      if (error.response) {
        throw error.response
      }
    }
  }
}
