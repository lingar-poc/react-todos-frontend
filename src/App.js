import React, {useReducer, useLayoutEffect, useEffect} from 'react';
import './App.css';
import {Todos} from './features/todos/Todos';
import {manageStore} from "./features/common/services/todos-store";
import {localStorageDataManagementWithPromises} from "./features/common/services/data-services";

/**
 * U here
 * Next time - TODO :
 - Finish the delete action.
 - Clean the code. Leave some info logs.
 - Add notices at the UI.
 - Push the branch.
 - Make PR. Share with David .

 * @type {({description: string, action: null}|{description: string, action: null}|{description: string, action: null})[]}
 */
const mocks = [
    {description: "Write some code ", action: null},
    {description: "Drink some Coke", action: null},
    {description: "Go to sleep", action: null}


]

function App() {
    //initializing data:
    let todos = null;


    // if (!localStorage.getItem('todos')) {
    //     localStorage.setItem('todos', JSON.stringify(mocks));
    // } else {
    //     todos = JSON.parse(localStorage.getItem('todos'));
    // }

    const initialTodos = {
        todos: todos,

    }
    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);

    useEffect(()=>{
        localStorageDataManagementWithPromises('GET', null).then(data=>{
            console.log("happen ? ")
            console.log("after promise = " , data);
            // todosStore.todos = data;
            dispatchTodoAction({
                type: 'GET',
                todos: data
                // todos: description
            });


        }).catch(()=>{
            console.log("errror ?")
        });
    },[]);


    return (
        <div className="">
            <p>with the help of God</p>
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
        </div>
    );
}

export default App;
