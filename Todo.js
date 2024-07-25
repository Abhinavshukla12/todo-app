document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const allFilter = document.getElementById("allFilter");
    const completedFilter = document.getElementById("completedFilter");
    const pendingFilter = document.getElementById("pendingFilter");

    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText !== "") {
            addTask(taskText, taskPriority, false);
            saveTasks();
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    allFilter.addEventListener("click", function() {
        filterTasks("all");
    });

    completedFilter.addEventListener("click", function() {
        filterTasks("completed");
    });

    pendingFilter.addEventListener("click", function() {
        filterTasks("pending");
    });

    function addTask(taskText, taskPriority, isCompleted) {
        const li = document.createElement("li");
        li.classList.add(taskPriority);

        const taskContent = document.createElement("span");
        taskContent.classList.add("task-content");
        if (isCompleted) {
            taskContent.classList.add("completed");
        }
        taskContent.textContent = taskText;
        li.appendChild(taskContent);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("completeBtn");
        completeBtn.addEventListener("click", function() {
            taskContent.classList.toggle("completed");
            saveTasks();
        });
        buttonContainer.appendChild(completeBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit task:", taskText);
            if (newText !== null && newText.trim() !== "") {
                taskContent.textContent = newText.trim();
                saveTasks();
            }
        });
        buttonContainer.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(li);
            saveTasks();
        });
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");
        taskItems.forEach(item => {
            const taskText = item.querySelector("span").textContent.trim();
            const taskPriority = item.classList.contains("low") ? "low" : (item.classList.contains("medium") ? "medium" : "high");
            const isCompleted = item.querySelector("span").classList.contains("completed");
            tasks.push({ text: taskText, priority: taskPriority, completed: isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.text, task.priority, task.completed);
        });
    }

    function filterTasks(status) {
        const taskItems = taskList.querySelectorAll("li");
        taskItems.forEach(item => {
            const isCompleted = item.querySelector("span").classList.contains("completed");
            switch (status) {
                case "all":
                    item.style.display = "flex";
                    break;
                case "completed":
                    item.style.display = isCompleted ? "flex" : "none";
                    break;
                case "pending":
                    item.style.display = isCompleted ? "none" : "flex";
                    break;
            }
        });
    }
});
