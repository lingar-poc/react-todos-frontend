import React, {useState} from 'react';
import {Todo} from "../todo/Todo";
import {localStorageDataManagementWithPromises} from "../common/services/data-services";

export function Todos(props) {
    const [description, setDescription] = useState("");
    let todosList = <p className="pop-msg">Loading</p>;

    const [showError, setShowError] = useState(false);
    const [working, setWorking] = useState(false);
    const [errMsg, setErrMsg] = useState("General error");

    if (props.todosStore.todos) {
        if (props.todosStore.todos.length < 1) {
            todosList = <p className="pop-msg" style={{top: "50%"}}>No items</p>;
        } else {
            todosList = props.todosStore.todos.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Todo description={item.description} action={props.todosAction} id={item.id} mark={item.mark} dataService = {props.dataService}/>
                    </div>
                );
            });
        }
    }

    return (
        <div>
            <h2>Be PROACTIVE! - Write some todos!</h2>
            <div>Create new TODO :</div>
            <input value={description} onChange={(event) => setDescription(event.target.value)}/>

            <button
                onClick={(e) => {
                    console.log("click");
                    setWorking(true);
                    if (description === "") {
                        alert("Description cannot be empty");
                        setWorking(false);

                        return;
                    }
                    props.dataService.webService('POST', {description: description, mark: false})

                        .then(item => {
                                props.todosAction({
                                    type: 'POST',
                                    description: description,
                                    newItem: item
                                });
                                setDescription("");
                            },
                            (err) => {
                                console.log("error!")
                                setErrMsg(err);
                                setShowError(true);
                                setTimeout(() => {
                                    setShowError(false);

                                }, 3000);
                            }
                        ).then(() => setWorking(false));

                }}
            >Add new TODO with promise
            </button>
            <h3>Todos:</h3>
            {todosList}
            {showError ? <p className="pop-msg" style={{color: 'red'}}>{errMsg} </p> : null}
            {working || props.todosStore.loading ?
                <p className="pop-msg" style={{color: 'dodgerblue'}}>Working on that! </p> : null}
        </div>
    );
}