"use strict";

let display = document.getElementById(`display`);

let buttons = Array.from(document.getElementsByClassName(`btn`));

buttons.map((btn) => {
  btn.addEventListener(`click`, function (e) {
    switch (e.target.innerText) {
      case `C`:
        display.innerText = ``;
        break;
      case `=`:
        try {
          display.innerText = eval(display.innerText);
        } catch {
          display.innerText = `⛔ Error ⛔`;
          break;
        }
        break;
      default:
        display.innerText += e.target.innerText;
    }
  });
});
