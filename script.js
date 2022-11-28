"use strict";

const btnContainer = document.querySelector(".btn-container");
const btnAction = document.querySelector(".action-btn");
const time = document.querySelector(".time");

class App {
  constructor() {
    this.timer = { hours: 0, minutes: 0, seconds: 0 };
    this.stopwatch;
    this.target;
    btnContainer.addEventListener("click", this.btnFunctionality.bind(this));
  }

  btnFunctionality(e) {
    this.target = e.target;
    const btn = this.target.closest(".icon-container");
    if (!btn) return;
    if (btn.classList.contains("action-btn")) {
      this.actionBtn();
    }
    if (btn.classList.contains("replay-btn")) {
      this.replayBtn();
    }
  }

  stopwatchInterfaceLogic() {
    time.textContent = `${
      this.timer.hours < 10 ? "0" + this.timer.hours : this.timer.hours
    }:${
      this.timer.minutes < 10 ? "0" + this.timer.minutes : this.timer.minutes
    }:${
      this.timer.seconds < 10 ? "0" + this.timer.seconds : this.timer.seconds
    }`;
  }

  intervalCallback() {
    this.timer.seconds++;
    if (this.timer.seconds === 60) {
      this.timer.minutes++;
      this.timer.seconds = 0;
    }
    if (this.timer.minutes === 60) {
      this.timer.hours++;
      this.timer.minutes = 0;
    }

    this.stopwatchInterfaceLogic();
  }

  actionBtn() {
    btnAction.classList.toggle("running");
    if (btnAction.classList.contains("running")) {
      this.stopwatch = setInterval(this.intervalCallback.bind(this), 1000);
      btnAction.querySelector("img").src =
        "https://cdn-icons-png.flaticon.com/128/2920/2920686.png";
    }
    if (!btnAction.classList.contains("running")) {
      clearInterval(this.stopwatch);
      btnAction.querySelector("img").src =
        "https://cdn-icons-png.flaticon.com/128/27/27223.png";
    }
  }

  replayBtn() {
    if (btnAction.classList.contains("running")) {
      btnAction.classList.remove("running");
    }
    this.timer = { hours: 0, minutes: 0, seconds: 0 };
    this.stopwatchInterfaceLogic();
    btnAction.querySelector("img").src =
      "https://cdn-icons-png.flaticon.com/128/27/27223.png";
    clearInterval(this.stopwatch);
  }
}

const app = new App();
