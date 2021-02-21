import React, {useEffect, useReducer, useState, useLayoutEffect, useRef} from 'react';
import './App.css';
import {Todos} from './features/todos/Todos';
import {manageStore} from "./features/common/services/todos-store";
/**
 * TODO:
 * - Clean the code.
 * - Do the data service will be passed to the childs
 * - Implement functions for serverSide.
 * - Make sure they are all working
 */
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
        dataService: null,
        loading: false

    }
    //Instantiate the todos-store, with data, and with dispatching action (function that will happen in each dispatching of the action and will be manipulate the data
    const [todosStore, dispatchTodoAction] = useReducer(manageStore, initialTodos);
    const [serverConnection, setServerConnection] = useState(false);
    const init = useRef(true);
    //This is the data service that used for getting data. It's conditionally can be for local or for server.
    const [dataService, setDataService] = useState(localDataService);

    //Function for get data from the service
    const getData = () => {


        // console.log("getting the data from the   " + (serverConnection ? "Server" : "localstorage") + "...");
        // console.log("loading? " , todosStore.loading);
        // console.log("dataService = ", dataService);

        dataService.webService('GET', null).then(data => {
            console.log("Data =  ", data);

            dispatchTodoAction({
                type: 'GET',
                todos: data
            });
        }).catch(() => {
            console.log("Error with getting the data");
        }).finally(() => {
            dispatchTodoAction({
                type: 'LOADING',
                loading: false
            });
        });
    }

    //Updating/initializing data -  happens after the dataService changed
    useLayoutEffect(() => {//layout because it affects the loading on the view.
        console.log("updating data");
        if (serverConnection) {
            dispatchTodoAction({
                type: 'LOADING',
                loading: true
            });
            console.log("getData - server  ? ", serverConnection);
            axios.get(BASE_URL + "/test-server").then(() => {
                console.log("server up");
                getData();
            }).catch(() => {
                alert("server down");
                setServerConnection(false);
                dispatchTodoAction({
                    type: 'LOADING',
                    loading: false
                });

            }).finally(() => {

            });
        } else {
            dispatchTodoAction({
                type: 'LOCAL_STORAGE',
            });
            getData();
        }
    }, [dataService]);

    //When the serverConnection changed, we are respectively changing the dataService type.
    useEffect(() => {
        if (serverConnection) {
            dispatchTodoAction({
                type: 'LOADING',
                loading: true
            });
            // console.log("Checking if server connected.. ");
            axios.get(BASE_URL + "/test-server").then(() => {
                console.log("server up, setting serverDataService");
                setDataService(serverDataService);
            }).catch(() => {
                alert("server down - you need to run server project for use the server data!");
                setServerConnection(false);
                dispatchTodoAction({
                    type: 'LOADING',
                    loading: false
                });


            }).finally(() => {

            });
        } else {
            console.log("Setting localStorage");
            setDataService(localDataService);
        }
    }, [serverConnection]);

    return (
        <div className="">
            <p>with the help of God</p>
            <p>Done with love by Izhar Mashkif (lingar) , yimprogramming@gmail.com. <b>I am available for new projects</b> :) !
            </p>


            <ul>
                <li>Done by useReducer from react-hooks, a tool for easily manage stores.</li>
                <li>It's demonstrate working with promises, and then update the store.
                    You can change the delay time in:
                    <pre> features/common/services/data-services.js </pre>
                </li>
                <li style={{color: "red"}}>For see error you can add description with "error" text and see what's
                    happen
                </li>
                <li>For running it with server you need to pull and run the proper repository. </li>

            </ul>
            {!todosStore.loading ? <div>
                <h2>Connected to {serverConnection ? "Server" : "localstorage"}</h2>
                <h3>Switch to {!serverConnection ? "Server" : "localstorage"} connections</h3>
                <input type="checkbox"
                       onChange={() => setServerConnection(!serverConnection)}
                       checked={serverConnection}/>
            </div> : "Trying to connect"}
            {/*The todos component with todo's store for managing the data from one place*/}
            {/*TODO - make a prop of the data service which will pass to the store and its Todo's childs. */}
            <Todos todosStore={todosStore} todosAction={dispatchTodoAction}/>
            {todosStore.loading && <div className="loader"></div>}

        </div>
    );
}

export default App;
