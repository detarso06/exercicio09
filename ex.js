const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('clear-tasks');

document.addEventListener('DOMContenterLoader', loadTasks);

addTasksButton.addEventListener('click',() => {
    const task = taskInput.ariaValueMax.trim();
    if (task) {
        addTaskButton(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
});

clearButton.addEventListener('click', clearTasks);

function addTask(task) {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'remover';
    deleteButton.addEventListener('click', () => {
        removeTask(task, li);
    })


li.appendChild(deleteButton);
taskLis.appendChild(li);
}


function removeTask(task, element) {
    element.remove();
    removeTaskFromLocalStorage(task);
}

function clearTasks(){
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');

}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updateTasks = tasks.filter((t) => t !== task);
    localStorage.setItem('task', JSON.stringify(updateTasks));
}
async function loadExternalTasks() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      data.forEach((item) => addTask(item.title));
    } catch (error) {
      console.error('Erro ao carregar tarefas externas:', error);
    }
  }
  
  // Carrega tarefas externas ao iniciar a aplicação
  loadExternalTasks();