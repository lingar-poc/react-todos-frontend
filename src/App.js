import React, {useReducer} from 'react';
import './App.css';
import {Todos} from './features/todos/Todos';
import {manageStore} from "./features/common/services/todos-store";

const mocks = [
    {description: "Write some code ", action: null},
    {description: "Drink some Coke", action: null},
    {description: "Go to sleep", action: null}


]

function App() {
    //initializing data:
    let todos = [];
    if (!localStorage.getItem('todos')) {
        localStorage.setItem('todos', JSON.stringify(mocks));
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const initialTodos = {
        todos: todos,

    }

    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);

    return (
        <div className="">
            <p>with the help of God</p>
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
        </div>
    );
}

export default App;
