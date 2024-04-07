import prompts from 'prompts';
import { projectPrompt } from './project.js';
import { projectList } from './main.js'

export class Task {
  constructor(name, details) {
    this.name = name;
    this.details = details;
  }
}

function getTaskList(project) {
  const taskList = [];
  for (let task of project) {
    taskList.push(task.name);
  }
  return taskList;
}

export async function taskPrompt(project) {
  let taskList = getTaskList(project);
  const response = await prompts({
    type: 'select',
    name: 'task',
    message: 'Choose a Task: ',
    choices: taskList.concat(['Add New Task', 'Return to Menu']),
  });
  if (response.task === taskList.length) {
    addTask(project);
  } else if (response.task === taskList.length + 1) {
    projectPrompt(projectList);
  } else {
    let task = project[response.task];
    taskMenu(project, task, response);
  }
}

async function taskMenu(project, task, index) {
  const response = await prompts({
    type: 'select',
    name: 'taskDelete',
    message: `${task.name}: ${task.details}`,
    choices: ['Return To Menu', 'DELETE Task'],
  });
  if (response.taskDelete === 1) {
    console.log(index.task);
    project.splice(index.task, 1);
    taskPrompt(project);
  } else {
    taskPrompt(project);
  }
}

async function addTask(project) {
  const response = await prompts({
    type: 'text',
    name: 'newTaskName',
    message: 'Enter New Task Name: ',
  });
  const response2 = await prompts({
    type: 'text',
    name: 'newTaskDetails',
    message: 'Enter Task Details: ',
  });
  project.push(new Task(response.newTaskName, response2.newTaskDetails));
  taskPrompt(project);
}
