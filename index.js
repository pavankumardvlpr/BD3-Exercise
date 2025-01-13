const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());

// Array of tasks
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Add a Task to the TaskList
function addTask(task) {
  tasks.push(task);
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let task = { taskId: taskId, text: text, priority: priority };

  let result = addTask(task);
  res.json({ tasks: tasks });
});

// Read All Tasks in the Task List
app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

// Sort Tasks by Priorirty in Ascending Order
function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  tasksCopy.sort(sortTasksByPriority);
  res.json({ tasksCopy: tasksCopy });
});

// Edit Task Priority
function updatePriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  updatePriority(taskId, priority);
  res.json({ tasks: tasks });
});

// Edit/Update Task Text
function updateText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = text;
    }
  }
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  updateText(taskId, text);
  res.json({ tasks: tasks });
});

// Delete a Task from the Task List
function deleteTask(ele, taskId) {
  return ele.taskId !== taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((ele) => deleteTask(ele, taskId));
  res.json({ tasks: tasks });
});

//  Filter Tasks by Priority
function filterTasks(ele, priority) {
  return ele.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((ele) => filterTasks(ele, priority));
  res.json({ tasks: result });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
