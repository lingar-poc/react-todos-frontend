import React, {useState} from 'react';
import {Todo} from "../todo/Todo";

export function Todos(props) {
    const [description, setDescription] = useState("");
    let todosList = "loading";

    if (props.todosStore.todos) {
        if(props.todosStore.todos.length < 1){
            todosList =  "No items";

        }
        else {
            todosList = props.todosStore.todos.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Todo description={item.description} action={props.todosAction} id={item.id} mark={item.mark}/>
                    </div>
                );
            });
        }

    }


    return (
        <div>
            <h2>Write some todos! </h2>
            <div>Create new TODO :</div>
            <input value={description} onChange={(event) => setDescription(event.target.value)}/>
            <button
                onClick={(e) => {
                    console.log("click")
                    props.todosAction({
                        type: 'POST',
                        description: description
                    });
                    setDescription("");
                    e.preventDefault();
                }}
            >Add new TODO
            </button>
            <h3>Todos:</h3>
            {todosList}
        </div>
    );
}