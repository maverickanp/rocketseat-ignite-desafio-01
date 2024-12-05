import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.post('/', (req, res) => taskController.createTask(req, res));
router.get('/', (req, res) => taskController.listTasks(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));
router.patch('/:id/complete', (req, res) => taskController.completeTask(req, res));
router.post('/import', (req, res) => taskController.importTasks(req, res));

export default router;