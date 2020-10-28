let todoItems = [];


function addTodo (text) {
	const todo = {
		text,
		checked: false,
		id: Date.now(),
	};

	todoItems.push(todo);
	renderTodo(todo);
}


function toggleDone (key) {
  const index = todoItems.findIndex(function(item) {
    return item.id === Number(key);
  });

  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}


function deleteTodo(key) {
  const index = todoItems.findIndex(function(item) {
    return item.id === Number(key);
  })

  const todo = {
    deleted: true,
    ...todoItems[index]
  }

  todoItems = todoItems.filter(item => item.id !== Number(key));

  renderTodo(todo);
}


const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
	event.preventDefault();

	// track input
	const input = document.querySelector('.js-todo-input');
	// get input and trim
	const text = input.value.trim();

	// validate input
	if (text !== '') {
		addTodo(text);
		input.value = '';
		input.focus();
	}
})


function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`)

  const listItem = document.createElement("li");

  let isChecked = todo.checked ? 'done' : '';

  if (todo.deleted) {
    item.remove();
    return
  }

  listItem.setAttribute('class', `todo-item ${isChecked}`);
  listItem.setAttribute('data-key', `${todo.id}`);

  isChecked = isChecked === "done" ? '-done' : '';

  listItem.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon${isChecked}"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(listItem, item);
  } else {
    list.prepend(listItem);
  }
}


const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const lista = localStorage.getItem('todoItems');

  if (lista) {
    todoItems = JSON.parse(lista);
    todoItems.forEach(todo => {
      renderTodo(todo);
    });
  }
})