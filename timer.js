const timer = document.getElementById("timer");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");


let hours = 0;
let minutes = 0;
let seconds = 0;

let interval = null;



let speed = 1000;



start.addEventListener("click", () => {

    if (interval !== null) return;

    interval = setInterval(() => {

        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }


        let h = String(hours).padStart(2, "0");
        let m = String(minutes).padStart(2, "0");
        let s = String(seconds).padStart(2, "0");


        timer.textContent = `${h}:${m}:${s}`;


    }, speed);

});



stop.addEventListener("click", () => {

    clearInterval(interval);
    interval = null;

});



restart.addEventListener("click", () => {

    clearInterval(interval);
    interval = null;

    hours = 0;
    minutes = 0;
    seconds = 0;

    timer.textContent = "00:00:00";

});