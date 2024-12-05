import { Request, Response } from 'express';
import fs from 'fs';
import { parse } from 'csv-parse';
import { Task, TaskModel } from '../models/Task';

export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
      try {
          const { title, description } = req.body;

          if (!title || !description) {
              res.status(400).json({ error: 'Title and description are required.' });
              return;
          }

          const newTask = await TaskModel.create({ title, description });
          res.status(201).json(newTask);
      } catch (error) {
          console.log('error:', error)
          res.status(500).json({ error: 'Error creating task.' });
      }
  }

  async listTasks(req: Request, res: Response): Promise<void> {
      try {
          const { title, description } = req.query;
          let query = {};

          if (title) {
              query = { ...query, title: { $regex: title, $options: 'i' } };
          }

          if (description) {
              query = { ...query, description: { $regex: description, $options: 'i' } };
          }

          const tasks = await TaskModel.find(query);
          res.json(tasks);
      } catch (error) {
          res.status(500).json({ error: 'Error listing tasks.' });
      }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const { title, description } = req.body;

          const updatedTask = await TaskModel.findByIdAndUpdate(
              id,
              { title, description, updated_at: new Date() },
              { new: true }
          );

          if (!updatedTask) {
              res.status(404).json({ error: 'Task not found.' });
              return;
          }

          res.json(updatedTask);
      } catch (error) {
          res.status(500).json({ error: 'Error updating task.' });
      }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;

          const deletedTask = await TaskModel.findByIdAndDelete(id);

          if (!deletedTask) {
              res.status(404).json({ error: 'Task not found.' });
              return;
          }

          res.status(204).send();
      } catch (error) {
          res.status(500).json({ error: 'Error deleting task.' });
      }
  }

  async completeTask(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;

          const task = await TaskModel.findById(id);

          if (!task) {
              res.status(404).json({ error: 'Task not found.' });
              return;
          }

          task.completed_at = task.completed_at ? null : new Date();
          task.updated_at = new Date();
          await task.save();

          res.json(task);
      } catch (error) {
          res.status(500).json({ error: 'Error updating task status.' });
      }
  }

  importTasks(req: Request, res: Response): void {
      const filePath = './data/tasks.csv'; // Caminho do arquivo CSV

      const importedTasks: Task[] = [];

      fs.createReadStream(filePath)
          .pipe(parse({ delimiter: ',', from_line: 2 }))
          .on('data', async (row) => {
              const [title, description] = row;

              const newTask = new TaskModel({
                  title,
                  description,
                  completed_at: null,
                  created_at: new Date(),
                  updated_at: new Date(),
              });

              importedTasks.push(newTask);
              await newTask.save();
          })
          .on('end', () => {
              res.status(201).json({ message: 'Tasks imported successfully.', importedTasks });
          })
          .on('error', (err) => {
              res.status(500).json({ error: 'Error importing tasks.' });
          });
  }
}