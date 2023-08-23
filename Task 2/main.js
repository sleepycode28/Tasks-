
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Array to store tasks
let tasks = [];

// Function to update and display tasks
function updateTasks() {
  taskList.innerHTML = "";

  // Loop through tasks and create elements for each task
  tasks.forEach((task, index) => {
  
    const li = createTaskElement(task, index);
    
    taskList.appendChild(li);
  });

  // Save tasks to local storage
  saveTasks();
}

// Function to create a task element
function createTaskElement(task, index) {
  const li = document.createElement("li");   // Create a <li> element
  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="task-text ${task.completed ? "completed-task" : ""}">${task.text}</span>
    <span class="delete-button">Delete</span>
  `;

  // Select checkbox and delete button within the task element
  const checkbox = li.querySelector("input");
  const deleteButton = li.querySelector(".delete-button");

  // Event listener for checkbox change
  checkbox.addEventListener("change", () => {
  
    tasks[index].completed = checkbox.checked;
    
    updateTasks();
  });

  // Event listener for delete button click
  deleteButton.addEventListener("click", () => {
    tasks.splice(index, 1);     // Remove the task from the array
    updateTasks();
  });

  return li;
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for "Add Task" button click
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false }); // Add a new task to the array
    updateTasks();
    taskInput.value = "";
  }
});

// Load tasks from local storage when the page loads
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  // Update and display tasks
  updateTasks();
}
