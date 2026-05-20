# Fullstack ToDo List

A modern, responsive ToDo List application built with Node.js (Express) and Vanilla JavaScript. The UI is inspired by Google's Material Design 3 (Dark Theme) and Hyprland aesthetics.

## 🚀 Features
- **Task Management:** Add new tasks with optional date/time deadlines.
- **Status Updates:** Mark tasks as completed or active.
- **Real-time Search:** Filter tasks dynamically as you type.
- **Tab Filtering:** View All, In Progress, or Completed tasks.
- **Client-Server Architecture:** Tasks are saved persistently on a local Node.js server.
- **Modern UI/UX:** Material Design 3 guidelines, local Roboto fonts, and custom SVG icons.

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Backend:** Node.js, Express.js
- **Database:** Local JSON file storage (File System)

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Flerwi/ToDo-List.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open in your browser:
   [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```text
ToDoList/
├── data/
│   └── tasks.json      # Database file for tasks
├── public/             # Static frontend files
│   ├── assets/         # Local fonts and SVG icons
│   ├── css/
│   ├── js/
│   └── index.html
├── server.js           # Express server logic
└── package.json        # Project dependencies
```
