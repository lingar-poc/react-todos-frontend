import React, {useEffect, useReducer, useState, useLayoutEffect} from 'react';
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
        dataService: null

    }
    //Instantiate the todos-store, with data, and with dispatching action (function that will happen in each dispatching of the action and will be manipulate the data
    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);
    const [serverConnection, setServerConnection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadAgain, setLoadAgain] = useState(false);

    const getData = () => {
        dispatchTodoAction({
            type: serverConnection ? 'SERVER' : 'LOCAL_STORAGE',
        });
        console.log("getting the data from the   " + (serverConnection ? "Server" : "localstorage") + "...");
        // localStorageDataManagementWithPromises('GET', null).then(data => {
        todosStore.dataService.webService('GET', null).then(data => {
            console.log("Data =  ", data);

            dispatchTodoAction({
                type: 'GET',
                todos: data
            });
        }).catch(() => {
            console.log("Error with getting the data");
        });
    }

    useEffect(() => {
        console.log("getting the data from the localstorage...")
        localStorageDataManagementWithPromises('GET', null).then(data => {
            console.log("Data =  ", data);
            dispatchTodoAction({
                type: 'GET',
                todos: data
            });
        }).catch(() => {
            console.log("Error with getting the data");
        });
    },[]);
    useLayoutEffect(() => {//layout because it affects the loading
        if (serverConnection) {
            setLoading(true);

            axios.get(BASE_URL + "/test-server").then(() => {
                console.log("server up");
                getData();
            }).catch(() => {
                alert("server down");
                setServerConnection(false);


            }).finally(() => {
                setLoading(false);
                setLoadAgain(!loadAgain);

            });
        }
        else {
            getData();
        }
    }, [serverConnection])

    // useEffect(() => {
    //     getData();
    // }, [loadAgain]);

    return (
        <div className="">
            <p>with the help of God</p>
            <p>Done2 by Izhar Mashkif (lingar) , yimprogramming@gmail.com. <b>I am available for new projects</b> :) !
            </p>
            {!loading ? <div>
                <h2>Connected to {serverConnection ? "Server" : "localstorage"}</h2>
                <h3>Switch to {!serverConnection ? "Server" : "localstorage"} connections</h3>
                <input type="checkbox"
                       onChange={() => setServerConnection(!serverConnection)}
                       checked={serverConnection}/>
            </div> : "Trying to connect"}

            <ul>
                <li>Done with useReducer from react-hooks, a tool for easily manage stores.</li>
                <li>It's demonstrate working with promises, and then update the store.
                    You can change the delay time in22
                    <pre> features/common/services/data-services.js </pre>
                </li>
                <li style={{color: "red"}}>For see error you can add description with "error" text and see what's
                    happen
                </li>

            </ul>
            {/*The todos component with todo's store to manage the data from one place*/}
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
            {loading && <div className="loader"></div>}
            <p>l22 = {loading + ""}</p>

        </div>
    );
}

export default App;
