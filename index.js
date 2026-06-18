#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TASKS_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.tasks.json');

// Load tasks from file
const loadTasks = () => {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
    }
  } catch (err) {
    console.error(chalk.red('Error loading tasks'));
  }
  return [];
};

// Save tasks to file
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error(chalk.red('Error saving tasks'));
  }
};

// Add task
const addTask = (description) => {
  const tasks = loadTasks();
  const task = {
    id: Date.now(),
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log(chalk.green(`✓ Task added: "${description}"`));
};

// List tasks
const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks yet. Add one with: task add "your task"'));
    return;
  }
  
  console.log(chalk.cyan('\n═══════════════════════════════════════'));
  console.log(chalk.cyan.bold('  YOUR TASKS'));
  console.log(chalk.cyan('═══════════════════════════════════════\n'));
  
  tasks.forEach((task, idx) => {
    const checkbox = task.completed ? chalk.green('✓') : chalk.gray('○');
    const text = task.completed ? chalk.strikethrough.gray(task.description) : task.description;
    console.log(`  ${checkbox} [${task.id}] ${text}`);
  });
  console.log(chalk.cyan('\n═══════════════════════════════════════\n'));
};

// Complete task
const completeTask = (id) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    const status = task.completed ? 'completed' : 'uncompleted';
    console.log(chalk.green(`✓ Task ${status}`));
  } else {
    console.log(chalk.red('Task not found'));
  }
};

// Delete task
const deleteTask = (id) => {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id != id);
  if (tasks.length < initialLength) {
    saveTasks(tasks);
    console.log(chalk.green('✓ Task deleted'));
  } else {
    console.log(chalk.red('Task not found'));
  }
};

// Clear all tasks
const clearTasks = () => {
  saveTasks([]);
  console.log(chalk.green('✓ All tasks cleared'));
};

// Show help
const showHelp = () => {
  console.log(chalk.cyan.bold('\n📋 TASK CLI - Usage\n'));
  console.log(chalk.white('  task add "description"       Add a new task'));
  console.log(chalk.white('  task list                    List all tasks'));
  console.log(chalk.white('  task done <id>               Mark task as done/undone'));
  console.log(chalk.white('  task delete <id>             Delete a task'));
  console.log(chalk.white('  task clear                   Clear all tasks'));
  console.log(chalk.white('  task help                    Show this help\n'));
};

// Main command parser
const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help' || command === '-h' || command === '--help') {
    showHelp();
    return;
  }

  switch (command) {
    case 'add':
      if (args.length < 2) {
        console.log(chalk.red('Error: Provide a task description'));
        console.log(chalk.yellow('Usage: task add "your task"'));
      } else {
        addTask(args.slice(1).join(' '));
      }
      break;
    case 'list':
    case 'ls':
      listTasks();
      break;
    case 'done':
      if (!args[1]) {
        console.log(chalk.red('Error: Provide a task ID'));
      } else {
        completeTask(args[1]);
      }
      break;
    case 'delete':
    case 'del':
    case 'rm':
      if (!args[1]) {
        console.log(chalk.red('Error: Provide a task ID'));
      } else {
        deleteTask(args[1]);
      }
      break;
    case 'clear':
      clearTasks();
      break;
    default:
      console.log(chalk.red(`Unknown command: ${command}`));
      showHelp();
  }
};

main();
