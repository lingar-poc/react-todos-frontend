import logo from './logo.svg';
import {v4 as uuidv4} from 'uuid';
import React, {useReducer} from 'react';
import {Todo} from "./features/todo/Todo";

import './App.css';
import {Todos} from './features/todos/Todos';
import {Dashboard} from "./features/common/Dashboard";
import {DataAction, handleData} from "./features/common/services/dataServices";
const mocks = [
    {    description: "xzczxvxzc",action: null},
    {    description: "dsgdfsdf",action: null},
    {    description: "ererre",action: null}



]
function App() {
    //initializing data:
    let todos = [];
    if (!localStorage.getItem('todos')) {

        todos.push( {    description: "xzczxvxzc",action: null});
        todos.push({    description: "dsgdfsdf",action: null});
        localStorage.setItem('todos', JSON.stringify(todos));

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }



    const initialTodos = {
        todos: todos,

    }

    const [todosStore, dispatchTodoAction] = useReducer(handleUser, initialTodos);


//const found = array1.find(element => element > 10);
    return (
        <div className="">
            <p>with the help of God</p>

            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
            {/*<Todo description = "do something!"/>*/}

        </div>
    );
}

//reducer functions
function handleUser(usersStore, action) {
    switch (action.type) {
        case 'select':
            return {
                ...usersStore,
                selectedUser: action.id,
            }
        case 'ADD': {
            console.log("add...")
            console.log("add2...", usersStore.users);

            if (action.name === "") {
                alert("User name cannot be empty");
                return {...usersStore};
            }
            //preventing duplicates names
            else if (
                usersStore.users.map(item => item.name).includes(action.name)
            ) {
                alert("No duplicates names");
                return {...usersStore};

            }

            const item = {name: action.name, id: uuidv4(), generalResources: [{todos: null}]};
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'SAVE',
                    item: item,
                    itemType: 'users'
                }
            )
            handleData(dataAction);
            usersStore.users.push(item);
            usersStore.selectedUser = item.id;

            return {
                ...usersStore,
                // todos: usersStore.todos.push({name: action.name,  id: uuidv4(), generalResources: [{todos: null}]})
            }
        }
        case 'REMOVE': {
            console.log("remove...", usersStore.users);
            let itemToRemove = usersStore.users.findIndex((item) => {
                return item.id === action.id
            });
            console.log("after...", usersStore.users);

            console.log('idx = ' + itemToRemove);
            let newArr = [];
            if (itemToRemove > -1) {
                // usersStore.selectedUse = "5a8eb49b-d36b-457d-9b18-b757bbd99053";
                // usersStore.todos = usersStore.todos.splice(itemToRemove, 1 );
                usersStore.users.splice(itemToRemove, 1);


                console.log("todos ? ", usersStore.users, usersStore.users.find(user => user.id === usersStore.users[1].id));
                console.log(usersStore.users);
                itemToRemove === 0 ? usersStore.selectedUser = usersStore.users[1].id : usersStore.selectedUser = usersStore.users[0].id;
                // newArr = usersStore.todos.splice(itemToRemove, 1 );
                // usersStore.todos = usersStore.todos.splice(itemToRemove, 1 );

            }

            console.log("usersStore.selectedUser =", usersStore);
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'REMOVE',
                    itemType: 'users',
                    id: action.id
                }
            );
            handleData(dataAction);
            return {
                ...usersStore,

            }
        }
        default:
            return usersStore;
    }

}


export default App;
