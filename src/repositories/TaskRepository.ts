import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

export class TaskRepository {
    create(title: string, description: string): Task {
        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        };
        tasks.push(newTask);
        return newTask;
    }

    findAll(): Task[] {
        return tasks;
    }

    findById(id: string): Task | undefined {
        return tasks.find((task) => task.id === id);
    }

    update(id: string, title?: string, description?: string): Task | undefined {
        const task = this.findById(id);
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            task.updated_at = new Date();
        }
        return task;
    }

    delete(id: string): boolean {
        const index = tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    toggleComplete(id: string): Task | undefined {
        const task = this.findById(id);
        if (task) {
            task.completed_at = task.completed_at ? null : new Date();
            task.updated_at = new Date();
        }
        return task;
    }
}
