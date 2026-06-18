# Task CLI

A blazing-fast, lightweight CLI task manager built with Node.js. Manage your tasks from the terminal with a clean, colorful interface.

## Features

✨ **Simple Commands** — Intuitive CLI syntax  
🎨 **Colorful Output** — Beautiful terminal UI with chalk  
💾 **Persistent Storage** — Tasks saved in JSON (auto-created in home directory)  
⚡ **Blazing Fast** — Instant feedback on every action  
🪶 **Lightweight** — Minimal dependencies (just chalk)  

## Installation

```bash
git clone https://github.com/TheUndeadKnight/task-cli.git
cd task-cli
npm install
npm link  # Make 'task' command available globally
```

Or use directly without linking:
```bash
node index.js [command]
```

## Usage

### Add a Task
```bash
task add "Buy groceries"
task add "Finish project"
```

### List All Tasks
```bash
task list
# or
task ls
```

### Mark Task as Done/Undone
```bash
task done 1234567890
```

### Delete a Task
```bash
task delete 1234567890
# or: task del, task rm
```

### Clear All Tasks
```bash
task clear
```

### Show Help
```bash
task help
```

## Data Storage

Tasks are stored in `~/.tasks.json` (your home directory). Each task includes:
- **id** — Unique timestamp identifier
- **description** — Task text
- **completed** — Boolean status
- **createdAt** — ISO timestamp

Feel free to back up or transfer this file.

## Example Workflow

```bash
$ task add "Learn Node.js"
✓ Task added: "Learn Node.js"

$ task add "Build CLI tool"
✓ Task added: "Build CLI tool"

$ task list
═══════════════════════════════════════
  YOUR TASKS
═══════════════════════════════════════

  ○ [1623456789012] Learn Node.js
  ○ [1623456789013] Build CLI tool

═══════════════════════════════════════

$ task done 1623456789012
✓ Task completed

$ task list
═══════════════════════════════════════
  YOUR TASKS
═══════════════════════════════════════

  ✓ Learn Node.js
  ○ [1623456789013] Build CLI tool

═══════════════════════════════════════
```

## Development

### Run Tests
```bash
npm test
```

### Project Structure
```
task-cli/
├── index.js          # Main CLI application
├── package.json      # Dependencies & metadata
├── README.md         # This file
└── .gitignore        # Ignore node_modules, .tasks.json
```

## Dependencies

- **chalk** — Terminal styling and colors

## License

MIT

---

Made with ❤️ by TheUndeadKnight
