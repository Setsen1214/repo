// // Numbers (each appears twice)
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
// let cards = [...numbers, ...numbers];

// // Shuffle
// cards.sort(() => Math.random() - 0.5);

// let game = document.getElementById("game");

// let firstCard = null;
// let secondCard = null;
// let lock = false;
// let matchedPairs = 0;


// cards.forEach(number => {

//     let card = document.createElement("div");
//     card.classList.add("card", "hidden");
//     card.textContent = number;

//     card.addEventListener("click", function () {


//         if (lock) return;
//         if (!card.classList.contains("hidden")) return;


//         card.classList.remove("hidden");

//         if (firstCard == null) {

//             firstCard = card;

//         } else {

//             secondCard = card;
//             lock = true;


//             if (firstCard.textContent === secondCard.textContent) {

//                 matchedPairs++;

//                 setTimeout(function () {

//                     firstCard.classList.add("gone");
//                     secondCard.classList.add("gone");

//                     firstCard = null;
//                     secondCard = null;
//                     lock = false;

//                     if (matchedPairs === 8) {
//                         alert("🎉 You Win!");
//                     }

//                 }, 500);

//             } else {


//                 setTimeout(function () {

//                     firstCard.classList.add("hidden");
//                     secondCard.classList.add("hidden");

//                     firstCard = null;
//                     secondCard = null;
//                     lock = false;

//                 }, 1000);

//             }
//         }

//     });

//     game.appendChild(card);

// });

const board = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

board.sort(() => Math.random() - 0.5);

const boxes = document.querySelectorAll(".box");

let openIndex = [];
let lockBoard = false;
let matches = 0;

for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener("click", () => {

        if (lockBoard) return;

        if (openIndex.includes(i)) return;

        if (boxes[i].textContent !== "") return;

        if (openIndex.length < 2) {

            boxes[i].textContent = board[i];
            openIndex.push(i);

        }

        if (openIndex.length === 2) {

            lockBoard = true;

            const [a, b] = openIndex;

            if (board[a] === board[b]) {

                matches++;

                boxes[a].style.background = "green";
                boxes[b].style.background = "green";

                openIndex = [];
                lockBoard = false;

                if (matches === board.length / 2) {
                    setTimeout(() => {
                        alert("You Win!");
                    }, 300);
                }

            } else {

                setTimeout(() => {

                    boxes[a].textContent = "";
                    boxes[b].textContent = "";

                    openIndex = [];
                    lockBoard = false;

                }, 1000);

            }

        }

    });

}