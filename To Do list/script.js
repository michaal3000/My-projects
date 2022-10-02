`use strict`;

const addToDo = document.getElementById("add");
const inputField = document.getElementById("input");
let toDoList = document.getElementById("tasks");

//Adding new task
const addTask = function () {
  if (inputField.value === "") {
    alert("Please write the task!");
  } else {
    let html = `<div class="task"><input type="checkbox" name='checkbox' class="checkbox" id="checkbox"/>
    <p class="text">${inputField.value}</p> 
    <button class="close" id="close">X</button></div>`;

    toDoList.insertAdjacentHTML("afterend", html);
    inputField.value = "";
    checking();

    removing();
  }
};

addToDo.addEventListener("click", addTask);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

//Checkbox
const checking = function () {
  document.getElementById("checkbox").addEventListener(
    "click",
    function (ev) {
      ev.target.parentNode.classList[ev.target.checked ? "add" : "remove"](
        "done"
      );
    },
    false
  );
};

//Removing task
const removing = function () {
  let closers = document.querySelectorAll("#close");
  closers.forEach(function (closer) {
    closer.addEventListener("click", function () {
      closer.parentElement.remove();
    });
  });
};
