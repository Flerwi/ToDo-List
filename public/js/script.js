const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const hasDeadlineCheckbox = document.getElementById("hasDeadline");
const taskDeadlineInput = document.getElementById("taskDeadline");

const tabButtons = document.querySelectorAll(".tab-button");
const searchInput = document.getElementById("searchInput");
const totalTasksElement = document.getElementById("totalTasks");
const deleteAllButton = document.getElementById("deleteAllButton");

hasDeadlineCheckbox.addEventListener("change", function() {
    if (hasDeadlineCheckbox.checked) {
        taskDeadlineInput.classList.remove("hidden"); 
    } else {
        taskDeadlineInput.classList.add("hidden"); 
        taskDeadlineInput.value = ""; 
    }
});

function updateTotalCount() {
    const total = taskList.querySelectorAll("li").length;
    totalTasksElement.textContent = total;
}

function filterTasks() {
    const activeTab = document.querySelector(".tab-button.active");
    const filterStatus = activeTab.textContent; 
    const searchText = searchInput.value.toLowerCase();
    
    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function(task) {
        const isCompleted = task.classList.contains("completed");
        const taskText = task.querySelector(".task-text").textContent.toLowerCase();
        
        const matchesSearch = taskText.includes(searchText);
        
        let matchesTab = false;
        if (filterStatus === "Всі") matchesTab = true;
        else if (filterStatus === "В процесі" && !isCompleted) matchesTab = true;
        else if (filterStatus === "Виконані" && isCompleted) matchesTab = true;

        if (matchesSearch && matchesTab) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", filterTasks);

tabButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        filterTasks();
    });
});

function saveTasks() {
    const tasksArray = []; 
    const allListItems = document.querySelectorAll("#taskList li");
    
    allListItems.forEach(function(li) {
        const textElement = li.querySelector(".task-text");
        const dateElement = li.querySelector(".task-date");
        const isCompleted = li.classList.contains("completed");
        
        let taskDate = "";
        if (dateElement !== null) {
            taskDate = dateElement.textContent.trim();
        }
        
        const taskData = {
            text: textElement.textContent,
            date: taskDate,
            completed: isCompleted
        };
        
        tasksArray.push(taskData); 
    });
    
    fetch('/api/tasks', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(tasksArray) 
    }).then(function(response) {
        console.log("Tasks saved!");
    }).catch(function(error) {
        console.error("Error saving:", error);
    });
}

function loadTasks() {
    fetch('/api/tasks')
        .then(function(response) {
            return response.json(); 
        })
        .then(function(tasksArray) {
            tasksArray.forEach(function(task) {
                createTaskElement(task.text, task.date, task.completed);
            });
            
            updateTotalCount();
            filterTasks();
        })
        .catch(function(error) {
            console.error("Error loading:", error);
        });
}

function createTaskElement(text, date, isCompleted) {
    const li = document.createElement("li");
    
    if (isCompleted) {
        li.classList.add("completed");
    }
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = isCompleted; 
    
    checkbox.addEventListener("change", function() {
        if (this.checked) li.classList.add("completed");
        else li.classList.remove("completed");
        
        filterTasks(); 
        saveTasks(); 
    });

    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";
    
    const spanText = document.createElement("span");
    spanText.className = "task-text";
    spanText.textContent = text;
    contentDiv.appendChild(spanText);

    if (date && date !== "") {
        const dateSpan = document.createElement("span");
        dateSpan.className = "task-date"; 
        dateSpan.innerHTML = `<img src="assets/img/calendar.svg" alt="Calendar" width="14" height="14"> ` + date;
        contentDiv.appendChild(dateSpan); 
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<img src="assets/img/delete.svg" alt="Delete" width="20" height="20">`; 
    deleteBtn.title = "Видалити завдання";

    deleteBtn.addEventListener("click", function() {
        li.remove(); 
        updateTotalCount(); 
        saveTasks(); 
    });

    li.appendChild(checkbox);
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function addTask() {
    const taskTextValue = taskInput.value.trim();
    if (taskTextValue === "") return; 

    let dateValue = "";
    if (hasDeadlineCheckbox.checked && taskDeadlineInput.value !== "") {
        dateValue = taskDeadlineInput.value.replace("T", " ");
    }

    createTaskElement(taskTextValue, dateValue, false);

    taskInput.value = "";
    taskDeadlineInput.value = "";
    hasDeadlineCheckbox.checked = false;
    taskDeadlineInput.classList.add("hidden");

    updateTotalCount();
    filterTasks();
    saveTasks(); 
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

deleteAllButton.addEventListener("click", function() {
    if (confirm("Ви точно хочете видалити всі завдання?")) {
        taskList.innerHTML = ""; 
        updateTotalCount();
        saveTasks(); 
    }
});

loadTasks();
