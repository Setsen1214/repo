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



const board = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
let openIndex = [];
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventlistener("click", () => {
        if (openIndex.length < 2) {
            boxes[i].textContent = board[i];
            openIndex.push(i);
        }

        if (openIndex.length === 2) {
            const [a, b] = openIndex;
            if (board[a] === board[b]) {
                openIndex = [];
            } else {
                setTimeout(() => {
                    openIndex = [];
                    boxes[a].textContent = "";
                    boxes[b].textContent = "";
                }, 2000);
            }
        }
    });
}