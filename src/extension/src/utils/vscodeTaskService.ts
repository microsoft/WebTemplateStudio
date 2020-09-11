import * as vscode from "vscode";

export const getTasks = async (): Promise<vscode.Task[]> => {
  return await vscode.tasks.fetchTasks();
};

export const getTask = async (taskName: string): Promise<vscode.Task | undefined> => {
  const tasks = await getTasks();
  const task = tasks.find((t) => t.name === taskName);
  return task;
};

export const executeTask = async (task: vscode.Task): Promise<void> => {
  const execution = await vscode.tasks.executeTask(task);
  return new Promise<void>((resolve) => {
    const disposable = vscode.tasks.onDidEndTask((e) => {
      if (e.execution.task.name === execution.task.name) {
        disposable.dispose();
        resolve();
      }
    });
  });
};
