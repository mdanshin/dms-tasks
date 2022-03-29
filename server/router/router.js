import { Router } from 'express'

import taskController from '../controllers/task-controller.js'

const router = new Router()

router.get('/tasks', taskController.getTasks)
router.get('/task/:id', taskController.getTaskById)
router.get('/status', (req, res) => {
  res.json({ status: 'healthy', serverDateTime: Date() })
})


router.post('/completetask/:id', taskController.completeTask)
router.post('/addtask', taskController.addTask)
router.post('/updatetask/:id', taskController.updateTask)

export default router
