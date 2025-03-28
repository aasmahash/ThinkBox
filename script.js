// Task Manager Section
const taskInput = document.getElementById("taskInput");
const taskDateInput = document.getElementById("taskDate");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(addTaskToDOM);

addTaskButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = taskDateInput.value.trim(); // Get selected date

    if (taskText === "") return; // Ensure task is not empty

    // Store task with date
    const task = { text: taskText, date: dueDate || "No due date" };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(task);
    taskInput.value = "";
    taskDateInput.value = "";
}

function addTaskToDOM(task) {
    const li = document.createElement("li");

    // Create task text with due date
    const taskContent = document.createElement("span");
    taskContent.textContent = task.date !== "No due date" ? `${task.text} (Due: ${task.date})` : task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.text !== task.text || t.date !== task.date);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskList.removeChild(li);
    });

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
const notesInput = document.getElementById("notes");
const saveNoteButton = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");

// Load saved notes from local storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach(addNoteToDOM);

saveNoteButton.addEventListener("click", saveNote);

function saveNote() {
    const noteText = notesInput.value.trim();

    if (noteText === "") return; // Prevent empty notes

    // Store note
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    addNoteToDOM(noteText);
    notesInput.value = ""; // Clear the input field
}

function addNoteToDOM(noteText) {
    const li = document.createElement("li");
    li.textContent = noteText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        notes = notes.filter(n => n !== noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
        notesList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}
