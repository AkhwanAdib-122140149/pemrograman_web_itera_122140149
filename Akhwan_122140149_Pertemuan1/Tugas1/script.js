// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskInput = document.getElementById('newTask');
const taskDateInput = document.getElementById('taskDate');
const taskStatusInput = document.getElementById('taskStatus');
const notStartedTasksList = document.getElementById('notStartedTasks');
const inProgressTasksList = document.getElementById('inProgressTasks');
const completedTasksList = document.getElementById('completedTasks');

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  notStartedTasksList.innerHTML = '';
  inProgressTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.text} (Deadline: ${task.date})`;

    // Dropdown to change status
    const statusDropdown = document.createElement('select');
    statusDropdown.innerHTML = `
      <option value="not-started">Belum Dikerjakan</option>
      <option value="in-progress">Sedang Dikerjakan</option>
      <option value="completed">Sudah Selesai</option>
    `;
    statusDropdown.value = task.status;
    statusDropdown.addEventListener('change', () => {
      tasks[index].status = statusDropdown.value;
      saveTasks();
      renderTasks();
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(statusDropdown);
    li.appendChild(deleteButton);

    if (task.status === 'not-started') {
      notStartedTasksList.appendChild(li);
    } else if (task.status === 'in-progress') {
      inProgressTasksList.appendChild(li);
    } else if (task.status === 'completed') {
      li.classList.add('completed');
      completedTasksList.appendChild(li);
    }
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskStatus = taskStatusInput.value;

  if (taskText === '' || taskDate === '') {
    alert('Masukkan Tugas dan Tanggalnya.');
    return;
  }

  tasks.push({
    text: taskText,
    date: taskDate,
    status: taskStatus
  });

  saveTasks();
  taskInput.value = '';
  taskDateInput.value = '';
  taskStatusInput.value = 'not-started'; // Reset to default
  renderTasks();
}

// Initial render
renderTasks();
