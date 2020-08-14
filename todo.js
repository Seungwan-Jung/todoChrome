const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "todoes";

let toDoes = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDoes = toDoes.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDoes = cleanToDoes;
  saveToDoes();
}

function saveToDoes() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDoes));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoes.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDoes.push(toDoObj);
  saveToDoes();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadTodo() {
  const loadedToDoes = localStorage.getItem(TODO_LS);
  if (loadedToDoes !== null) {
    const parsedToDoes = JSON.parse(loadedToDoes);
    parsedToDoes.forEach(function (doSomething) {
      paintToDo(doSomething.text);
    });
  }
}

function init() {
  loadTodo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
