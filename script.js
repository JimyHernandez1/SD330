// Variables
let isOn = true;
let is24HourFormat = true;
let tempUnit = "F";
let temperature = Math.floor(Math.random() * 20) + 30; // Random start temp
let timerInterval;
const alarmSound = new Audio('alarm.mp3'); // replace with actual path

// Toggle Display
function toggleDisplay() {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = isOn ? "none" : "block");
    isOn = !isOn;
}

// Clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    if (!is24HourFormat && hours > 12) hours -= 12;
    document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`;
    setTimeout(updateClock, 1000);
}
function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
}

// Temperature Controls
function updateTemperatureDisplay() {
    document.getElementById("temp-display").innerHTML = `Temp: ${temperature}°${tempUnit}`;
}
function toggleTempUnit() {
    if (tempUnit === "F") {
        tempUnit = "C";
        temperature = Math.round((temperature - 32) * (5 / 9));
    } else {
        tempUnit = "F";
        temperature = Math.round(temperature * (9 / 5) + 32);
    }
    updateTemperatureDisplay();
}
function changeTemperature(amount) {
    temperature += amount;
    updateTemperatureDisplay();
}

// Timer
function startTimer() {
    const input = document.getElementById("timer-input").value;
    let time = parseInt(input, 10) * 60;
    if (isNaN(time) || time <= 0) return;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            alarmSound.play();
        } else {
            time--;
            document.getElementById("timer-display").innerHTML = `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;
        }
    }, 1000);
}

// Shopping List
function addItem() {
    const itemText = document.getElementById("new-item").value.trim();
    if (itemText) {
        const item = document.createElement("li");
        item.textContent = itemText;
        document.getElementById("shopping-list").appendChild(item);
        document.getElementById("new-item").value = "";
    }
}

// TV
function toggleTV() {
    const tvAudio = document.getElementById("tv-audio");
    if (tvAudio.paused) {
        tvAudio.play();
    } else {
        tvAudio.pause();
    }
}

// Initialize
window.onload = function () {
    updateClock();
    updateTemperatureDisplay();
};
