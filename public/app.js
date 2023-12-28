// public/app.js
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
  });
  
  function loadTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
  
        tasks.forEach(task => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${task.title}</strong><p>${task.description}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>`;
          taskList.appendChild(listItem);
        });
      });
  }
  
  function addTask() {
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
  
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
  
    if (title !== '') {
      const task = { title, description };
  
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(response => response.json())
        .then(newTask => {
          loadTasks();
          titleInput.value = '';
          descriptionInput.value = '';
        });
    }
  }
  
  function editTask(id) {
    const titleInput = prompt('Enter new task title:');
    const descriptionInput = prompt('Enter new task description:');
  
    if (titleInput !== null) {
      const updatedTask = { title: titleInput.trim(), description: descriptionInput.trim() };
  
      fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then(response => response.json())
        .then(updatedTask => {
          loadTasks();
        });
    }
  }
  
  function deleteTask(id) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
  
    if (confirmDelete) {
      fetch(`/tasks/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(result => {
          loadTasks();
        });
    }
  }
  