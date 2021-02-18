import React, {useEffect, useReducer, useState,useLayoutEffect} from 'react';
import './App.css';
import {Todos} from './features/todos/Todos';
import {manageStore} from "./features/common/services/todos-store";
import {localStorageDataManagementWithPromises} from "./features/common/services/data-services";
import axios from "axios";

export const BASE_URL = "http://localhost:8080/ws/";

function App() {
    //initializing data:
    let todos = null;

    const initialTodos = {
        todos: todos,

    }
    //Instantiate the todos-store, with data, and with dispatching action (function that will happen in each dispatching of the action and will be manipulate the data
    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);
    const [serverConnection, setServerConnection ] = useState(false);
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

    useLayoutEffect(()=>{
        if (serverConnection){
            axios.get(BASE_URL+"/test-server").then(()=>console.log("server up")).catch(()=>{
                console.error("server down");
                setServerConnection(false);
            });
        }
    })

    return (
        <div className="">
            <p>with the help of God</p>
            <p>Done by Izhar Mashkif (lingar) , yimprogramming@gmail.com. <b>I am available for new projects</b> :) !</p>
            <input type= "checkbox"
            onChange={()=>setServerConnection(!serverConnection)}
            checked={serverConnection}/>
            <ul>
                <li>Done with useReducer from react-hooks, a tool for easily manage stores. </li>
                <li>It's demonstrate working with promises, and then update the store.
                    You can change the delay time in<pre> features/common/services/data-services.js </pre>. </li>
                <li style = {{color:"red"}}>For see error you can add description with "error" text and see what's happen</li>

            </ul>
            {/*The todos component with todo's store to manage the data from one place*/}
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
        </div>
    );
}

export default App;
