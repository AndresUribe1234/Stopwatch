"use strict";

const btnContainer = document.querySelector(".btn-container");
const btnAction = document.querySelector(".action-btn");
const time = document.querySelector(".time");

class App {
  constructor() {
    this.timer = { hours: 0, minutes: 0, seconds: 0 };
    this.stopwatch;
    btnContainer.addEventListener("click", this.btnFunctionality.bind(this));
  }

  btnFunctionality(e) {
    const target = e.target;
    const btn = target.closest(".icon-container");

    if (!btn) return;

    if (btn.classList.contains("action-btn")) {
      btnAction.classList.toggle("running");

      if (btnAction.classList.contains("running")) {
        this.stopwatch = setInterval(this.btnAction.bind(this), 1000);
        btnAction.querySelector("img").src =
          "https://cdn-icons-png.flaticon.com/128/2920/2920686.png";
      }
      if (!btnAction.classList.contains("running")) {
        clearInterval(this.stopwatch);
        btnAction.querySelector("img").src =
          "https://cdn-icons-png.flaticon.com/128/27/27223.png";
      }
    }

    if (btn.classList.contains("replay-btn")) {
      this.timer = { hours: 0, minutes: 0, seconds: 0 };
      time.textContent = `${
        this.timer.hours < 10 ? "0" + this.timer.hours : this.timer.hours
      }:${
        this.timer.minutes < 10 ? "0" + this.timer.minutes : this.timer.minutes
      }:${
        this.timer.seconds < 10 ? "0" + this.timer.seconds : this.timer.seconds
      }`;
      btnAction.querySelector("img").src =
        "https://cdn-icons-png.flaticon.com/128/27/27223.png";
      clearInterval(this.stopwatch);
      btnAction.classList.toggle("running");
    }
  }

  btnAction() {
    this.timer.seconds++;
    if (this.timer.seconds === 60) {
      this.timer.minutes++;
      this.timer.seconds = 0;
    }
    if (this.timer.minutes === 60) {
      this.timer.hours++;
      this.timer.minutes = 0;
    }
    time.textContent = `${
      this.timer.hours < 10 ? "0" + this.timer.hours : this.timer.hours
    }:${
      this.timer.minutes < 10 ? "0" + this.timer.minutes : this.timer.minutes
    }:${
      this.timer.seconds < 10 ? "0" + this.timer.seconds : this.timer.seconds
    }`;
  }
}

const app = new App();
