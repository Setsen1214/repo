// const input = document.getElementById("taskInput");
// const addBtn = document.getElementById("addBtn");
// const taskList = document.getElementById("taskList");
// const filters = document.querySelectorAll(".filter");
// const count = document.getElementById("count");
// const clearBtn = document.getElementById("clearBtn");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// let currentFilter = "all";

// function save() {

//     localStorage.setItem("tasks", JSON.stringify(tasks));

// }

// function render() {

//     taskList.innerHTML = "";

//     let filtered = tasks;

//     if (currentFilter === "active") {

//         filtered = tasks.filter(task => !task.completed);

//     }

//     if (currentFilter === "completed") {

//         filtered = tasks.filter(task => task.completed);

//     }

//     filtered.forEach((task, index) => {

//         const div = document.createElement("div");

//         div.className = "task";

//         div.innerHTML = `

// <div class="left">

// <input
// type="checkbox"
// ${task.completed ? "checked" : ""}
// >

// <span class="${task.completed ? "completed" : ""}">
// ${task.text}
// </span>

// </div>

// <button class="delete">
// Delete
// </button>

// `;

//         const checkbox = div.querySelector("input");

//         checkbox.addEventListener("change", () => {

//             task.completed = !task.completed;

//             save();

//             render();

//         });

//         const del = div.querySelector(".delete");

//         del.addEventListener("click", () => {

//             tasks.splice(index, 1);

//             save();

//             render();

//         });

//         taskList.appendChild(div);

//     });

//     const completed = tasks.filter(task => task.completed).length;

//     count.textContent = `${completed} of ${tasks.length} tasks completed`;

// }

// addBtn.addEventListener("click", () => {

//     const text = input.value.trim();

//     if (text === "") return;

//     tasks.push({

//         text,

//         completed: false

//     });

//     input.value = "";

//     save();

//     render();

// });

// input.addEventListener("keypress", (e) => {

//     if (e.key === "Enter") {

//         addBtn.click();

//     }

// });

// filters.forEach(btn => {

//     btn.addEventListener("click", () => {

//         filters.forEach(b => b.classList.remove("active"));

//         btn.classList.add("active");

//         currentFilter = btn.dataset.filter;

//         render();

//     });

// });

// clearBtn.addEventListener("click", () => {

//     tasks = tasks.filter(task => !task.completed);

//     save();

//     render();

// });

// render();

let tasks = [];

let input = document.getElementById("taskInput");
let addButton = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let count = document.getElementById("count");
let clearButton = document.getElementById("clearBtn");
let filterButtons = document.querySelectorAll(".filter");

let currentFilter = "all";

addButton.addEventListener("click", addTask);

function addTask() {
    let text = input.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    input.value = "";
    displayTasks();
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        return tasks.filter(function (task) {
            return task.completed;
        });
    }

    return tasks;
}

function displayTasks() {
    taskList.innerHTML = "";

    let completedCount = 0;
    let visibleTasks = getFilteredTasks();

    for (let i = 0; i < visibleTasks.length; i++) {
        let task = visibleTasks[i];
        let taskIndex = tasks.indexOf(task);

        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        let left = document.createElement("div");
        left.className = "left";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            tasks[taskIndex].completed = checkbox.checked;
            displayTasks();
        });

        let text = document.createElement("span");
        text.innerText = task.text;

        if (task.completed) {
            text.className = "completed";
            completedCount++;
        }

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(taskIndex, 1);
            displayTasks();
        });

        left.appendChild(checkbox);
        left.appendChild(text);

        taskDiv.appendChild(left);
        taskDiv.appendChild(deleteButton);

        taskList.appendChild(taskDiv);
    }

    count.innerText =
        completedCount +
        " of " +
        tasks.length +
        " tasks completed";
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter = button.dataset.filter;
        displayTasks();
    });
});

clearButton.addEventListener("click", clearCompleted);

function clearCompleted() {
    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    displayTasks();
}

displayTasks();