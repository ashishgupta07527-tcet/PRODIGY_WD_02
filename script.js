let startTime, updatedTime, difference;
let interval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").onclick = () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
};

document.getElementById("pause").onclick = () => {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
};

document.getElementById("reset").onclick = () => {
    clearInterval(interval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00.000";
    laps.innerHTML = "";
};

document.getElementById("lap").onclick = () => {
    if (running) {
        let li = document.createElement("li");
        li.textContent = display.textContent;
        laps.appendChild(li);
    }
};

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;

    display.textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds.toString().padStart(3, '0')}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
