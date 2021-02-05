const $mainContent = document.querySelector('.main-content');

const removeCurrentContent = () => {
    const htmlCollection = [...$mainContent.children];
    $mainContent.removeChild(htmlCollection[2]);
    if (htmlCollection[3]) $mainContent.removeChild(htmlCollection[3]);   
}

const showMainTodo = inputValue => {
    const $newNode = document.createElement('div');
    $newNode.classList.add('main-todo');

    $newNode.innerHTML = `<p class="main-todo__heading">Today</p>
        <div class='main-todo__content'>
        <input type="checkbox" class="main-todo__checkbox"/>
        <span id='mainTodoDescription' class="main-todo__description" >${inputValue}</span>
        <i class="fa fa-times" class="remove-icon"></i>
        </div>`;

    $mainContent.appendChild($newNode);
}

const showMainInput = () => {

    const $newFrag = document.createDocumentFragment();
    const $newNode = document.createElement('label');
    $newNode.classList.add('main-content__input-label');
    $newNode.setAttribute('for', "mainTodo");
    $newNode.textContent = 'What is your main focus for today?'

    const $newNode1 = document.createElement('input');
    $newNode1.classList.add('main-content__input');
    $newNode1.setAttribute('type', 'text');
    $newNode1.setAttribute('id', 'mainTodo');
    $newNode1.setAttribute('name', 'main-todo');
    
    $newFrag.appendChild($newNode);
    $newFrag.appendChild($newNode1);

    $mainContent.appendChild($newFrag);
}

const removeMainTodo = e => {
    const $el = document.querySelector('.main-todo__content > i');
    if (e.target !== $el) return;
    localStorage.removeItem('main-todo');
    removeCurrentContent();
    showMainInput();
}

const displayMainTodo = (inputValue, e) => {
    if(e.key !== 'Enter') return;
    if(inputValue.length === 0) return;
    localStorage.setItem('main-todo', inputValue);
    removeCurrentContent();
    showMainTodo(inputValue);
}

const completeMainTodo = e => {
    if (!e.target.classList.contains('main-todo__checkbox')) return; 
    e.target.nextElementSibling.classList.toggle('line-through');
}

const mainTodoHandler = () => {
    const mainTodoValueInLocalStorage = localStorage.getItem('main-todo');
    if (mainTodoValueInLocalStorage) {
        removeCurrentContent();
        showMainTodo(mainTodoValueInLocalStorage);
    }
    $mainContent.addEventListener('keydown', event => displayMainTodo(event.target.value, event));
    $mainContent.addEventListener('click', removeMainTodo);
    $mainContent.addEventListener('click', completeMainTodo);
} 

export default mainTodoHandler;