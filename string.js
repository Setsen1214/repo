// const cells = document.querySelectorAll(".cell");
// const statusText = document.getElementById("status");

// let currentPlayer = "X";
// let board = ["", "", "", "", "", "", "", "", ""];
// let gameActive = true;

// const winPatterns = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// cells.forEach(cell => {
//     cell.addEventListener("click", cellClicked);
// });

// function cellClicked() {
//     const index = this.dataset.index;

//     if (board[index] !== "" || !gameActive) {
//         return;
//     }

//     board[index] = currentPlayer;
//     this.textContent = currentPlayer;

//     checkWinner();

//     if (gameActive) {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//         statusText.textContent = `Player ${currentPlayer}'s Turn`;
//     }
// }

// function checkWinner() {
//     for (let pattern of winPatterns) {
//         const [a, b, c] = pattern;

//         if (
//             board[a] &&
//             board[a] === board[b] &&
//             board[a] === board[c]
//         ) {
//             statusText.textContent = `Player ${board[a]} Wins!`;
//             gameActive = false;
//             return;
//         }
//     }

//     if (!board.includes("")) {
//         statusText.textContent = "It's a Draw!";
//         gameActive = false;
//     }
// }

// function restartGame() {
//     board = ["", "", "", "", "", "", "", "", ""];
//     currentPlayer = "X";
//     gameActive = true;

//     cells.forEach(cell => {
//         cell.textContent = "";
//     });

//     statusText.textContent = "Player X's Turn";
// }



// const board = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
// let openIndex = [];
// for (let i = 0; i < boxes.length; i++) {
//     boxes[i].addEventlistener("click", () => {
//         if (openIndex.length < 2) {
//             boxes[i].textContent = board[i];
//             openIndex.push(i);
//         }

//         if (openIndex.length === 2) {
//             const [a, b] = openIndex;
//             if (board[a] === board[b]) {
//                 openIndex = [];
//             } else {
//                 setTimeout(() => {
//                     openIndex = [];
//                     boxes[a].textContent = "";
//                     boxes[b].textContent = "";
//                 }, 2000);
//             }
//         }
//     });
// }

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function save() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function render() {

    taskList.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "active") {

        filtered = tasks.filter(task => !task.completed);

    }

    if (currentFilter === "completed") {

        filtered = tasks.filter(task => task.completed);

    }

    filtered.forEach((task, index) => {

        const div = document.createElement("div");

        div.className = "task";

        div.innerHTML = `

<div class="left">

<input
type="checkbox"
${task.completed ? "checked" : ""}
>

<span class="${task.completed ? "completed" : ""}">
${task.text}
</span>

</div>

<button class="delete">
Delete
</button>

`;

        const checkbox = div.querySelector("input");

        checkbox.addEventListener("change", () => {

            task.completed = !task.completed;

            save();

            render();

        });

        const del = div.querySelector(".delete");

        del.addEventListener("click", () => {

            tasks.splice(index, 1);

            save();

            render();

        });

        taskList.appendChild(div);

    });

    const completed = tasks.filter(task => task.completed).length;

    count.textContent = `${completed} of ${tasks.length} tasks completed`;

}

addBtn.addEventListener("click", () => {

    const text = input.value.trim();

    if (text === "") return;

    tasks.push({

        text,

        completed: false

    });

    input.value = "";

    save();

    render();

});

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addBtn.click();

    }

});

filters.forEach(btn => {

    btn.addEventListener("click", () => {

        filters.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        render();

    });

});

clearBtn.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    save();

    render();

});

render();