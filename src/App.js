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
 */

function App() {
    //initializing data:
    let todos = null;

    const initialTodos = {
        todos: todos,

    }
    //Instantiate the todos-store, with data, and with dispatching action (function that will happen in each dispatching of the action and will be manipulate the data
    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);

    useEffect(()=>{
        console.log("getting the data from the localstorage...")
        localStorageDataManagementWithPromises('GET', null).then(data=>{
            console.log("Data =  " , data);
            dispatchTodoAction({
                type: 'GET',
                todos: data
            });
        }).catch(()=>{
            console.log("Error with getting the data");
        });
    },[]);


    return (
        <div className="">
            <p>with the help of God</p>
            <p>Done by Izhar Mashkif (lingar) , yimprogramming@gmail.com. I am available for new projects :) !</p>
            {/*The todos component with todo's store to manage the data from one place*/}
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
        </div>
    );
}

export default App;
