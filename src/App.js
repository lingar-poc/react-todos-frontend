import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import {Users} from './features/users/Users';



function App() {
    //initializing data:
    let users = [];
    if(!localStorage.getItem('users')){

        users.push({name: "Avaraham", id: uuidv4(), generalResources: [{todos: null}]});
        users.push({name: "Izhak", id: uuidv4(), generalResources: [{todos: null}]});

    }

    //creating store:
    const usersStore = {
        users: users,
        selectedUser: users[0].id

    }

    return (
        <div className="">
            <p>with the help of God</p>
            <Users data = {users} store ={usersStore}/>

        </div>
    );
}
//reducer functions
function selectUser(usersStore, action) {
    switch(action.type) {
        case 'select':
            return {
                ...usersStore,
                selectedUser: action.id,
            }
        default:
            return usersStore;
    }

}


export default App;
