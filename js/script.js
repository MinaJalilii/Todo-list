let ulSection = document.querySelector(".todos")
let input = document.querySelector(".add-input")
let addForm = document.querySelector(".add")

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToList(todo);
    });
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll('.todos span').forEach(todoSpan => {
        todos.push(todoSpan.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoToList(todoText) {
    let newLi = document.createElement('li');
    newLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    let newSpan = document.createElement('span');
    newSpan.textContent = todoText;
    newLi.appendChild(newSpan);
    let newTrashBtn = document.createElement('i');
    newTrashBtn.classList.add('fa', 'fa-trash-o', 'delete');
    newLi.appendChild(newTrashBtn);
    ulSection.appendChild(newLi);

    // Delete todo event
    newTrashBtn.addEventListener('click', function () {
        newTrashBtn.parentElement.remove();
        saveTodos(); // Update local storage after deletion
    });
}

addForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value.trim() !== "") {
        addTodoToList(input.value);
        input.value = "";
        saveTodos(); // Save todos whenever a new one is added
    }
})

document.addEventListener('DOMContentLoaded', loadTodos);