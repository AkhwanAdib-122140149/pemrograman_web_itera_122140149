class Task {
    constructor(name, deadline, status = "Belum Dikerjakan") {
      this.name = name;
      this.deadline = deadline;
      this.status = status;
    }
  }
  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const taskNameInput = document.getElementById("taskName");
  const taskDeadlineInput = document.getElementById("taskDeadline");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskTableBody = document.getElementById("taskTableBody");
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("searchInput");
  
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function getStatusClass(status) {
    switch (status) {
      case "Sedang Dikerjakan": return "status-sedang";
      case "Selesai": return "status-selesai";
      default: return "status-belum";
    }
  }
  
  function renderTasks(filtered = tasks) {
    taskTableBody.innerHTML = "";
  
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
    filtered.forEach((task) => {
      const index = tasks.indexOf(task);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.deadline}</td>
        <td>
          <select class="status-select ${getStatusClass(task.status)}" onchange="updateStatus(${index}, this.value)">
            <option value="Belum Dikerjakan" ${task.status === "Belum Dikerjakan" ? "selected" : ""}>Belum Dikerjakan</option>
            <option value="Sedang Dikerjakan" ${task.status === "Sedang Dikerjakan" ? "selected" : ""}>Sedang Dikerjakan</option>
            <option value="Selesai" ${task.status === "Selesai" ? "selected" : ""}>Selesai</option>
          </select>
        </td>
        <td>
          <button onclick="editTask(${index})">📝</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </td>
      `;
      taskTableBody.appendChild(row);
    });
  }
  
  function addTask() {
    const name = taskNameInput.value.trim();
    const deadline = taskDeadlineInput.value;
  
    if (!name || !deadline) {
      alert("Isi nama dan deadline tugas!");
      return;
    }
  
    tasks.push(new Task(name, deadline));
    saveTasks();
    renderTasks();
    taskNameInput.value = "";
    taskDeadlineInput.value = "";
  }
  
  function filterTasks() {
    const statusValue = statusFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
  
    const filtered = tasks.filter(task => {
      const matchStatus = statusValue === "all" ||
        (statusValue === "not-started" && task.status === "Belum Dikerjakan") ||
        (statusValue === "in-progress" && task.status === "Sedang Dikerjakan") ||
        (statusValue === "completed" && task.status === "Selesai");
  
      const matchSearch = task.name.toLowerCase().includes(searchTerm);
  
      return matchStatus && matchSearch;
    });
  
    renderTasks(filtered);
  }
  
  window.updateStatus = function(index, newStatus) {
    tasks[index].status = newStatus;
    saveTasks();
    filterTasks();
  };
  
  window.editTask = function(index) {
    const newName = prompt("Edit nama tugas:", tasks[index].name);
    const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", tasks[index].deadline);
    if (newName && newDeadline) {
      tasks[index].name = newName;
      tasks[index].deadline = newDeadline;
      saveTasks();
      filterTasks();
    }
  };
  
  window.deleteTask = function(index) {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
      tasks.splice(index, 1);
      saveTasks();
      filterTasks();
    }
  };
  
  addTaskBtn.addEventListener("click", addTask);
  statusFilter.addEventListener("change", filterTasks);
  searchInput.addEventListener("input", filterTasks);
  
  renderTasks();
  
