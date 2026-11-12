
// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

// Current year in the footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Academic planner: tasks are saved in this browser
const plannerForm = document.getElementById("plannerForm");
const taskField = document.getElementById("taskField");
const taskList = document.getElementById("taskList");
const noTasks = document.getElementById("noTasks");
let tasks = JSON.parse(localStorage.getItem("chineduPlannerTasks")) || [];

function saveTasks() {
  localStorage.setItem("chineduPlannerTasks", JSON.stringify(tasks));
}

function showTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  if (noTasks) noTasks.style.display = tasks.length ? "none" : "block";

  tasks.forEach(function (task) {
    const row = document.createElement("li");
    row.className = task.done ? "task-row done" : "task-row";

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.title;

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = task.done ? "Undo" : "Complete";
    doneBtn.addEventListener("click", function () {
      task.done = !task.done;
      saveTasks();
      showTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "remove";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (item) { return item.id !== task.id; });
      saveTasks();
      showTasks();
    });

    buttons.appendChild(doneBtn);
    buttons.appendChild(deleteBtn);
    row.appendChild(name);
    row.appendChild(buttons);
    taskList.appendChild(row);
  });
}

if (plannerForm) {
  plannerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = taskField.value.trim();
    if (!title) {
      alert("Please enter a task first.");
      return;
    }
    tasks.push({ id: Date.now(), title: title, done: false });
    saveTasks();
    showTasks();
    taskField.value = "";
    taskField.focus();
  });
}
showTasks();

// Contact form validation (front-end demonstration only)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("result");

    if (!name || !email || !phone || !message) {
      result.textContent = "Please complete all the fields.";
      result.style.color = "#a45151";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = "Please enter a valid email address.";
      result.style.color = "#a45151";
      return;
    }
    if (!/^\d+$/.test(phone)) {
      result.textContent = "Phone number should contain digits only.";
      result.style.color = "#a45151";
      return;
    }
    result.textContent = "Messsage sent!";
    result.style.color = "#28704b";
    contactForm.reset();
  });
}
