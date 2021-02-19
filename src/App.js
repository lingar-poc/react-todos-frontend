import React, {useEffect, useReducer, useState, useLayoutEffect, useRef} from 'react';
import './App.css';
import {Todos} from './features/todos/Todos';
import {manageStore} from "./features/common/services/todos-store";
import {
    localDataService,
    localStorageDataManagementWithPromises,
    serverDataService
} from "./features/common/services/data-services";
import axios from "axios";
import {BASE_URL} from "./features/app-constants";

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
    const init = useRef(true);
    // const firstUpdate = useRef(true);

    //todo - make the DataService - NOT depend on store. Default is localDataService - V
    const [dataService, setDataService] = useState(localDataService);

    //Todo Convert it to use the local State DataService -V
    const getData = () => {
        dispatchTodoAction({
            type: 'LOADING',
            loading: true
        });

        console.log("getting the data from the   " + (serverConnection ? "Server" : "localstorage") + "...");
        console.log("dataService = ", dataService);

        // localStorageDataManagementWithPromises('GET', null).then(data => {
        dataService.webService('GET', null).then(data => {
            console.log("Data =  ", data);

            dispatchTodoAction({
                type: 'GET',
                todos: data
            });
        }).catch(() => {
            console.log("Error with getting the data");
        }).finally(() => {
            setLoading(false);
            dispatchTodoAction({
                type: 'LOADING',
                loading: false
            });
        });
    }

    //initial loading.
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
    }, []);

    //todo - Updating data do it happen after the dataService changed
    useLayoutEffect(() => {//layout because it affects the loading
        if (init.current) {
            init.current = false;
            return;
        }
        console.log("updating data");
        if (serverConnection) {
            setLoading(true);
            console.log("getData - server  ? ", serverConnection);
            axios.get(BASE_URL + "/test-server").then(() => {
                console.log("server up");
                getData();
            }).catch(() => {
                alert("server down");
                setServerConnection(false);
                setLoading(false);


            }).finally(() => {

            });
        } else {
            console.log("getData - server  ? ", serverConnection);
            dispatchTodoAction({
                type: 'LOCAL_STORAGE',
            });
            getData();
        }
    }, [dataService]);

    useEffect(() => {
        if (init.current) {
            init.current = false;
            return;
        }
        console.log("Setting data service ")
        if (serverConnection) {
            setLoading(true);
            //Checking if server connected..
            console.log("Checking if server connected.. ")
            axios.get(BASE_URL + "/test-server").then(() => {
                console.log("server up, setting serverDataService");
                setDataService(serverDataService);
            }).catch(() => {
                alert("server down");
                setServerConnection(false);


            }).finally(() => {
                setLoading(false);
            });
        } else {
            console.log("Setting localStorage");
            setDataService(localDataService);
        }
    }, [serverConnection]);
    // useEffect(() => {
    //     getData();
    // }, [loadAgain]);

    return (
        <div className="">
            <p>with the help of God</p>
            <p>Done by Izhar Mashkif (lingar) , yimprogramming@gmail.com. <b>I am available for new projects</b> :) !
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
            {/*TODO - make a prop of the data service which will pass to the store and its Todo's childs. */}
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
            {loading || todosStore.loading && <div className="loader"></div>}
            <p>l22 = {loading + ""}</p>

        </div>
    );
}

export default App;
