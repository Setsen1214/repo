const words = [
    "APPLE",
    "HOUSE",
    "PLANT",
    "MOUSE",
    "BRICK",
    "TABLE",
    "WATER",
    "SMILE",
    "LIGHT",
    "TRAIN"
];

const answer = words[Math.floor(Math.random() * words.length)];

console.log(answer);

let guess = "";
let row = 0;

const board = document.getElementById("board");

for (let i = 0; i < 30; i++) {
    let box = document.createElement("div");
    box.className = "box";
    board.appendChild(box);
}

const boxes = document.querySelectorAll(".box");

function press(letter) {

    if (guess.length < 5) {
        guess += letter;
        boxes[row * 5 + guess.length - 1].textContent = letter;
    }

}

function removeLetter() {

    if (guess.length > 0) {
        boxes[row * 5 + guess.length - 1].textContent = "";
        guess = guess.slice(0, -1);
    }

}

function check() {

    if (guess.length != 5) {
        alert("Need 5 letters");
        return;
    }

    for (let i = 0; i < 5; i++) {

        if (guess[i] == answer[i]) {
            boxes[row * 5 + i].classList.add("green");
        }
        else if (answer.includes(guess[i])) {
            boxes[row * 5 + i].classList.add("yellow");
        }
        else {
            boxes[row * 5 + i].classList.add("gray");
        }

    }

    if (guess == answer) {
        alert("You Win!");
        return;
    }

    row++;
    guess = "";

    if (row == 6) {
        alert("Game Over");
    }

}
document.addEventListener("keydown", function (event) {

    let key = event.key.toUpperCase();

    if (key === "ENTER") {
        check();
    }
    else if (key === "BACKSPACE") {
        removeLetter();
    }
    else if (key >= "A" && key <= "Z") {
        press(key);
    }

});

// const boardEl = document.querySelector(".board");
// const keyboardEl = document.querySelector(".keyboard");

// const keys = [
//   ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
//   ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
// ];

// const board = [
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
// ];

// const targetWord = "APPLE";

// let currentRow = 0,
//   currentColumn = 0;

// const renderBoard = () => {
//   boardEl.innerHTML = "";

//   for (let i = 0; i < board.length; i++) {
//     const row = document.createElement("div");
//     row.classList.add("row");

//     for (let j = 0; j < board[0].length; j++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.textContent = board[i][j];

//       if (i < currentRow) {
//         if (targetWord[j] === board[i][j]) {
//           cell.classList.add("correct");
//         } else if (targetWord.includes(board[i][j])) {
//           cell.classList.add("present");
//         } else {
//           cell.classList.add("absent");
//         }
//       }

//       row.appendChild(cell);
//     }

//     boardEl.appendChild(row);
//   }
// };

// const buildKeyboard = () => {
//   for (let i = 0; i < keys.length; i++) {
//     const row = document.createElement("div");
//     row.classList.add("keyboard-row");

//     for (let j = 0; j < keys[i].length; j++) {
//       const key = document.createElement("div");
//       key.classList.add("key");
//       key.textContent = keys[i][j];

//       key.addEventListener("click", () => {
//         handleClick(keys[i][j]);
//       });

//       row.appendChild(key);
//     }

//     keyboardEl.appendChild(row);
//   }
// };

// const handleClick = (key) => {
//   if (key === "Backspace") {
//     if (currentColumn === 0) return;

//     board[currentRow][currentColumn - 1] = "";
//     currentColumn--;

//     renderBoard();
//   } else if (key === "Enter") {
//     currentRow++;
//     currentColumn = 0;

//     renderBoard();
//   } else {
//     if (currentColumn > 4) return;

//     board[currentRow][currentColumn] = key;
//     currentColumn++;

//     renderBoard();
//   }
// };

// renderBoard();
// buildKeyboard();
