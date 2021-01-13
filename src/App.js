import logo from './logo.svg';
import {v4 as uuidv4} from 'uuid';
import React, {useReducer} from 'react';
import {Todo} from "./features/todo/Todo";

import './App.css';
import {Users} from './features/users/Users';
import {Dashboard} from "./features/common/Dashboard";
import {DataAction, handleData} from "./features/common/services/dataServices";


function App() {
    //initializing data:
    let users = [];
    if (!localStorage.getItem('users')) {

        users.push({name: "Avaraham", id: uuidv4(), generalResources: [{todos: null}]});
        users.push({name: "Izhak", id: uuidv4(), generalResources: [{todos: null}]});
        localStorage.setItem('users', JSON.stringify(users));

    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }

    //creating store:
    const initialUsers = {
        users: users,
        selectedUser: users[0].id

    }
    const [userStore, dispatchUserAction] = useReducer(handleUser, initialUsers);

//const found = array1.find(element => element > 10);
    return (
        <div className="">
            {userStore.selectedUser}
            <p>with the help of God</p>
            <Dashboard user={userStore.users.find(user => user.id === userStore.selectedUser)}/>

            <Users data={users} store={userStore} userAction={dispatchUserAction}/>
            <Todo description = "do something!"/>

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
                // users: usersStore.users.push({name: action.name,  id: uuidv4(), generalResources: [{todos: null}]})
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
                // usersStore.users = usersStore.users.splice(itemToRemove, 1 );
                usersStore.users.splice(itemToRemove, 1);


                console.log("users ? ", usersStore.users, usersStore.users.find(user => user.id === usersStore.users[1].id));
                console.log(usersStore.users);
                itemToRemove === 0 ? usersStore.selectedUser = usersStore.users[1].id : usersStore.selectedUser = usersStore.users[0].id;
                // newArr = usersStore.users.splice(itemToRemove, 1 );
                // usersStore.users = usersStore.users.splice(itemToRemove, 1 );

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
