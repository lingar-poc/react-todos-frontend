import React, {useState} from 'react';
import {Todo} from "../todo/Todo";
import PropTypes from 'prop-types';

/**
 * TODO :
 * - convert to todos
 * - Make style simple radius border, with some padding.
 * - Make circle symbol which changed.
 * @param props
 * @returns {*}
 * @constructor
 */
export function Todos(props) {
    const [description, setUserName] = useState("");
    const addUser = () => {

    }
    const [val, setVal] = useState('default value');


    // const list2 = props.store.users.map((item, idx) => {
    //     return (
    //         <div key={idx}
    //              onClick={() => {
    //                  props.userAction({
    //                      type: 'select',
    //                      id: item.id
    //                  })
    //              }}
    //         >
    //             Name = {item.name} <span className="remove" onClick={
    //             (event) => {
    //                 event.stopPropagation();
    //                 props.userAction({
    //                     type: 'REMOVE',
    //                     id: item.id
    //                 })
    //             }
    //         }>&#10060;</span></div>
    //     )
    // })

    const list3 = props.todosStore.todos.map((item, idx) => {
        return (
            <div key={idx}>
            <Todo description = {item.description} action = {props.todosAction}/>
            </div>


        )
    })
    return (
        <div>
            <h2>Hi I am users</h2>
            <p>Hooks POCss</p>
            <p>{val}</p>
            <button onClick={() => setVal('changed values')}>Change value</button>
            <h2>List by store </h2>
            {list3}

            <div>Create new TODO :</div>
            <input value={description} onChange={(event) => setUserName(event.target.value)}/>
            <button
                onClick={() => {
                    props.todosAction({
                        type: 'POST',
                        description: description
                    })
                }}
            >Add new User
            </button>
        </div>
    );
}