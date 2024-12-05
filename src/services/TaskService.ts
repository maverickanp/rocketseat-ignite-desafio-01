import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../models/Task';

export class TaskService {
    private taskRepository = new TaskRepository();

    createTask(title: string, description: string): Task {
        return this.taskRepository.create(title, description);
    }

    listTasks(title?: string, description?: string): Task[] {
        let tasks = this.taskRepository.findAll();
        if (title) {
            tasks = tasks.filter((task) => task.title.includes(title));
        }
        if (description) {
            tasks = tasks.filter((task) => task.description.includes(description));
        }
        return tasks;
    }

    getTaskById(id: string): Task | undefined {
        return this.taskRepository.findById(id);
    }

    updateTask(id: string, title?: string, description?: string): Task | undefined {
        return this.taskRepository.update(id, title, description);
    }

    deleteTask(id: string): boolean {
        return this.taskRepository.delete(id);
    }

    toggleTaskCompletion(id: string): Task | undefined {
        return this.taskRepository.toggleComplete(id);
    }
}
