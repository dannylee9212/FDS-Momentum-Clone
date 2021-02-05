const subTodoHandler = (TODO_STATE, URL) => {
  const $toggleTodoBtn = document.querySelector(".sub-todo__button");
  const $todoPopUp = document.querySelector(".sub-todo__popup");
  const $dropDownMenu = document.querySelector(".sub-todo__menu");
  const $dropDownList = document.querySelector(".sub-todo__drop-down");
  const $todos = document.querySelector(".sub-todo__list");

  let todos = [];

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

  const render = () => {
    const _todos = todos;
    renderTodoList(_todos);
  }

  const updateTodos = _todos => {
    todos = _todos;
    render();
  };

  const getTodos = async (URL) => {
    try {
      const res = await fetch(`${URL}/todos`);
      const todo = await res.json();
      updateTodos(todo);
    } catch (error) {
      console.error(error);
    }
  };

    // 이벤트 핸들러
    window.onload = getTodos(URL);

    $toggleTodoBtn.onclick = () => {
      if ($todoPopUp.classList.contains('active')) {
        $todoPopUp.classList.add('transition');
        $todoPopUp.classList.replace('active', 'hide');
      } else $todoPopUp.classList.replace('hide', 'active');
    };
  
    $dropDownMenu.onclick = () => {
      $dropDownList.classList.toggle("active");
    };

};

export default subTodoHandler;