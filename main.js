import { projectPrompt } from './project.js';
import * as fs from 'fs';

async function main(projectList) {
  projectPrompt(projectList);
}

/*
function generateTestData(projectList) {
  projectList['p1'] = [];
  projectList['p2'] = [];
  projectList['p3'] = [];
  projectList['p4'] = [];
  projectList['p1'].push(
    new Task(
      'take out the garbage',
      'Please take out the garbage from the entire building'
    ),
    new Task('write a novel', 'Begin writing your best seller')
  );
  return projectList;
}
*/

export let projectList = {};

try {
  projectList = JSON.parse(fs.readFileSync('data.json'));
} catch (err) {
  console.error(`data.json is unreachable/does not exist: ${err}`);
  throw err;
}
//projectList = generateTestData(projectList);

main(projectList);
