import logo from './logo.svg';
import {v4 as uuidv4} from 'uuid';
import React, {useReducer} from 'react';

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

            <Users data={users} store={userStore} select={dispatchUserAction}/>

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
        default:
            return usersStore;
    }

}


export default App;
