import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import fs from 'fs';
import { parse } from 'csv-parse';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';


export class TaskController {
    private taskService = new TaskService();

    createTask(req: Request, res: Response): void {
        const { title, description } = req.body;

        if (!title || !description) {
            res.status(400).json({ error: 'Title and description are required.' });
            return;
        }

        const newTask = this.taskService.createTask(title, description);
        res.status(201).json(newTask);
    }

    listTasks(req: Request, res: Response): void {
        const { title, description } = req.query;

        const tasks = this.taskService.listTasks(title as string, description as string);
        res.json(tasks);
    }

    updateTask(req: Request, res: Response): void {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = this.taskService.updateTask(id, title, description);
        if (!task) {
            res.status(404).json({ error: 'Task not found.' });
            return;
        }

        res.json(task);
    }

    deleteTask(req: Request, res: Response): void {
        const { id } = req.params;

        const deleted = this.taskService.deleteTask(id);
        if (!deleted) {
            res.status(404).json({ error: 'Task not found.' });
            return;
        }

        res.status(204).send();
    }

    completeTask(req: Request, res: Response): void {
        const { id } = req.params;

        const task = this.taskService.toggleTaskCompletion(id);
        if (!task) {
            res.status(404).json({ error: 'Task not found.' });
            return;
        }

        res.json(task);
    }

    importTasks(req: Request, res: Response): void {
      const filePath = './data/tasks.csv'; // Caminho do arquivo CSV

      const importedTasks: Task[] = [];

      fs.createReadStream(filePath)
          .pipe(parse({ delimiter: ',', from_line: 2 }))
          .on('data', async (row) => {
              const [title, description] = row;

              const newTask: Task = {
                  id: uuidv4(),
                  title,
                  description,
                  completed_at: null,
                  created_at: new Date(),
                  updated_at: new Date(),
              };

              importedTasks.push(newTask);
              this.taskService.createTask(title, description);
          })
          .on('end', () => {

              res.status(201).json({ message: 'Tasks imported successfully.', tasks: importedTasks });
          })
          .on('error', (err) => {
              res.status(500).json({ error: 'Error importing tasks.' });
          });
  }
}
