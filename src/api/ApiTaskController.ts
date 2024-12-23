import { Task } from "../stores/task.store/task.store";


export const TASKS = 'tasks';

class ApiTaskController {
  static getTasks(): Task[] {
    const tasks = localStorage.getItem(TASKS);
    return tasks ? JSON.parse(tasks) : [];
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(TASKS, JSON.stringify(tasks));
  }
}

export default ApiTaskController;