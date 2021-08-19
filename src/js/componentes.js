import { Todo } from "../classes";
import { todoList } from '../index';


//referencias HTML
const divTodoList = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const aFiltros =document.querySelectorAll('.filtro');


export const crearTodoHTML = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

//eventos

input.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && input.value.length > 0) {
        const todo = new Todo(input.value);
        todoList.nuevoTodo(todo);
        crearTodoHTML(todo);
        input.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {

    const nombreElemto = (event.target.localName);
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemto.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    else if (nombreElemto.includes('button')) {
        todoList.eliminarTodo(todoId);
        todoElemento.innerHTML = '';
    }

})

btnBorrarCompletados.addEventListener('click', (event) => {

    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
})

ulFilters.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) {
        return;
    }
    aFiltros.forEach(elem=>elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    }

})