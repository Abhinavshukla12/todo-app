document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage when the page loads
    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks(); // Save tasks to localStorage after adding a new task
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;
        li.appendChild(taskContent);
        
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit task:", taskText);
            if (newText !== null && newText.trim() !== "") {
                taskContent.textContent = newText.trim();
                saveTasks(); // Save tasks to localStorage after editing a task
            }
        });
        buttonContainer.appendChild(editBtn);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(li);
            saveTasks(); // Save tasks to localStorage after deleting a task
        });
        buttonContainer.appendChild(deleteBtn);
        
        li.appendChild(buttonContainer);
        
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li span");
        taskItems.forEach(item => {
            tasks.push(item.textContent.trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => {
            addTask(taskText);
        });
    }
});
