const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tasks', function (req, res) {
    fs.readFile(TASKS_FILE, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return res.json([]);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/tasks', function (req, res) {
    const newTasksArray = req.body;

    fs.writeFile(TASKS_FILE, JSON.stringify(newTasksArray, null, 2), 'utf8', function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
        res.json({ message: 'Success' });
    });
});

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});
