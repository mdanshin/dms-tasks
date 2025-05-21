import { Router } from 'express'
import taskController from '../controllers/task-controller.js'

const router = new Router()

router.get('/tasks', taskController.getTasks)
router.get('/tasks/:id', taskController.getTaskById)
router.get('/status', (req, res) => {
  res.json({ status: 'healthy', serverDateTime: Date() })
})

router.post('/tasks', taskController.addTask)
router.put('/tasks/:id', taskController.updateTask)
router.patch('/tasks/:id/complete', taskController.completeTask)
router.delete('/tasks/:id', taskController.deleteTask)

export default router
