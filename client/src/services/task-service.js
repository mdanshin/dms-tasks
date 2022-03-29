import $api from '../http/index'

export default class TaskService {
  static async getTasks() {
    try {
      return await $api.get('/tasks')
    } catch (error) {
      if (error.response) {
        throw error.response  // how to handle error?
      }
    }
  }

  static async getTaskById(id) {
    try {
      return await $api.get(`/task/${id}`)
    } catch (error) {
      if (error.response) {
        throw error.response  // how to handle error?
      }
    }
  }

  static async addTask(data) {
    try {
      const task = await $api.post('/addtask', {
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
      return await $api.post('/updatetask/' + id, {
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
      return await $api.post('/completetask/' + id, {
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
