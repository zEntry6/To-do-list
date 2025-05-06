const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filters = document.querySelectorAll("#filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

// Render todos based on filter
function render() {
  list.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.cursor = "pointer";
    span.onclick = () => toggleComplete(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTodo(index);

    li.append(span, delBtn);
    list.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(text) {
  todos.push({ text, completed: false });
  render();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

form.onsubmit = e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTodo(text);
    input.value = "";
  }
};

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  };
});

render();
