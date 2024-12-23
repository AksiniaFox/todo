import { makeAutoObservable, runInAction } from "mobx";
import ApiTaskController from "../../api/ApiTaskController";


export type Task = {
  id: number;
  done: boolean;
  text: string;
};

export class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  fetchTasks() {
    this.isLoading = true;

    try {
      const tasks = ApiTaskController.getTasks();
      runInAction(() => {
        this.tasks = tasks;
        this.isLoading = false;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Не удалось загрузить задачи";
        this.isLoading = false;
      });
      console.error(error);
    }
  }

  addTask(text: string) {
    const newTask: Task = {
      id: Date.now(),
      done: false,
      text,
    };

    runInAction(() => {
      this.tasks.push(newTask);
      ApiTaskController.saveTasks(this.tasks);
    });
  }

  toggleTaskDone(id: number) {
    runInAction(() => {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.done = !task.done;
        ApiTaskController.saveTasks(this.tasks);
      }
    });
  }

  deleteTask(id: number) {
    runInAction(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      ApiTaskController.saveTasks(this.tasks);
    });
  }
}

export default new TaskStore();
