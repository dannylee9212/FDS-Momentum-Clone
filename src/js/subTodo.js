
const subTodoHandler = (TODO_STATE, URL) => {
  const $toggleTodoBtn = document.querySelector(".sub-todo__button");
  const $todoPopUp = document.querySelector(".sub-todo__popup");
  const $dropDownMenu = document.querySelector(".sub-todo__menu");
  const $dropDownList = document.querySelector(".sub-todo__drop-down");
  const $todos = document.querySelector(".sub-todo__list");
  const $inputTodo = document.querySelector(".sub-todo__input");
  const $todoState = document.querySelector(".sub-todo__selected")
  const $inboxCount = document.querySelector("#Inbox > span");
  const $todayCount = document.querySelector("#Today > span");
  const $doneCount = document.querySelector("#Done > span");


  let todos = [];
  let state = TODO_STATE;

  const renderTodoList = _todos => {
    let html = '';
    _todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item">
          <input id="ck-${id}" class="checkbox" type="checkbox" ${ completed ? 'checked' : ''}>
          <label class= "${completed ? 'done' : ''}" for="ck-${id}">${content}</label>
          <i class="remove-todo fa fa-times" aria-hidden="true"></i>
        </li>`;
      $todos.innerHTML = html;
    })
  }

  const renderEmptyTodo = (activeCount, completedCount) => {
    let html = '';
    $inputTodo.classList.add('hidden');
    html += `<div class="sub-todo__empty">
      <span>No Todos Yet</span>
      <button class="sub-todo__go-to-button"> ${state === 'Done' ? activeCount : completedCount } 
      todos in ${state === 'Today' ? 'Done' : 'Today'}<i class="fa fa-chevron-right" aria-hidden="true"></i></button>
      <button class="sub-todo__new-button">New Todo</button>  
    </div> 
    `;
    $todos.innerHTML = html;
  };

  const renderTodoState = (allCount, completedCount, activeCount) => {
    $todoState.firstChild.nodeValue = state;

    [...$dropDownList.children].forEach(option => {
      option.firstChild.nodeValue === state ? option.classList.add('selected') : option.classList.remove('selected')
    });

    $inboxCount.textContent = allCount;
    $doneCount.textContent = completedCount;
    $todayCount.textContent = activeCount;
  };
  
  const render = () => {
    const _todos = todos.filter(({ completed }) => (state === 'Done' ? completed : state === 'Today' ? !completed : true));
    const allCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = allCount - completedCount;

    renderTodoState(allCount, completedCount, activeCount);

    if (_todos.length === 0) {
      renderEmptyTodo(activeCount, completedCount);
    } else renderTodoList(_todos);
  }

  const updateTodos = _todos => {
    todos = _todos;
    render();
  };

  const getTodos = async () => {
    try {
      const res = await fetch(`${URL}/todos`);
      const _todos = await res.json();
      updateTodos(_todos);
    } catch (error) {
      console.error(error);
    }
  };

  const config = (method, payload) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

  const addTodo = async content => {
    try {
      const res = await fetch(`${URL}/todos`, config('POST',  { id: generateId(), content, completed: false }));
      const _todos = await res.json();
      updateTodos(_todos);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async id => {
    try {
      const { completed } = todos.find(todo => todo.id === +id); 
      const res = await fetch(`${URL}/todos/${id}`, config('PATCH', { completed }));
      const _todos = await res.json();
      updateTodos(_todos);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async id => {
    try {
      const res = await fetch(`${URL}/todos/${id}`, config('DELETE'));
      const _todos = await res.json();
      updateTodos(_todos);
    } catch (error) {
      console.error(error);
    }
  }

    // 이벤트 핸들러
    window.onload = getTodos;

    $toggleTodoBtn.onclick = () => {
      if ($todoPopUp.classList.contains('active')) {
        $todoPopUp.classList.add('transition');
        $todoPopUp.classList.replace('active', 'hide');
      } else $todoPopUp.classList.replace('hide', 'active');
    };
  
    $dropDownMenu.onclick = () => {
      $dropDownList.classList.toggle("active");
    };

    $inputTodo.onkeyup = ({ key, target }) => {
      const content = target.value.trim();
      if (key !== 'Enter' || content === '') return;
      if (state === 'Done') state = 'Today'; 
      addTodo(content);
      target.value = '';
      
    };

    $todos.onchange = e => {
      toggleTodo(e.target.parentNode.id);
    };

    $todos.onclick = e => {
      if (!e.target.matches('.remove-todo')) return; 
      removeTodo(e.target.parentNode.id);
    };

    $dropDownList.onclick = e => {
      state = (e.target.classList.contains('todo-count') ? e.target.parentNode.id : e.target.id);
      $dropDownList.classList.remove("active");
      $inputTodo.classList.remove("hidden");
      render();
    }
};

export default subTodoHandler;