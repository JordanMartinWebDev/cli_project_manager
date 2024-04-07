import { taskPrompt } from './task.js';
import prompts from 'prompts';
import * as fs from 'fs';

export async function addProject(projectList) {
  const response = await prompts({
    type: 'text',
    name: 'newProject',
    message: 'Enter New Project Name: ',
  });
  projectList[response.newProject] = [];
  projectPrompt(projectList);
}

export async function deleteProject(projectList) {
  const response = await prompts({
    type: 'select',
    name: 'deleteProject',
    message: 'Select Name To Delete: ',
    choices: Object.keys(projectList),
  });
  delete projectList[Object.keys(projectList)[response.deleteProject]];
  projectPrompt(projectList);
}

export async function projectPrompt(projectList) {
  const response = await prompts({
    type: 'select',
    name: 'project',
    message: 'Choose a project: ',
    choices: Object.keys(projectList).concat([
      'Add a Project',
      'Delete a Project',
      'Save Data',
    ]),
  });
  if (response.project === Object.keys(projectList).length) {
    addProject(projectList);
  } else if (response.project === Object.keys(projectList).length + 1) {
    deleteProject(projectList);
  } else if (response.project === Object.keys(projectList).length + 2) {
    saveData(projectList);
  } else {
    let project = projectList[Object.keys(projectList)[response.project]];
    taskPrompt(project);
  }
}

function saveData(projectList) {
  const data = JSON.stringify(projectList);
  fs.writeFile('data.json', data, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('Data written successfully');
    projectPrompt(projectList);
  });
}
