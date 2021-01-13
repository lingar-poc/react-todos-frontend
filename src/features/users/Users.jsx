import React, {useState} from 'react';
import PropTypes from 'prop-types';


export function Users(props) {
    const [newUserName, setUserName] = useState("");
    const addUser = () => {

    }
    const [val, setVal] = useState('default value');
    const list = props.data.map((item, idx) => {
        return <div key={idx}>Name = {item.name}</div>
    });

    const list2 = props.store.users.map((item, idx) => {
        return (
            <div key={idx}
                 className={props.store.selectedUser === item.id ? 'selectedUser' : ''}
                 onClick={() => {
                     props.userAction({
                         type: 'select',
                         id: item.id
                     })
                 }}
            >
                Name = {item.name} <span className="remove" onClick={
                (event) => {
                    event.stopPropagation();
                    props.userAction({
                        type: 'REMOVE',
                        id: item.id
                    })
                }
            }>&#10060;</span></div>
        )
    })
    return (
        <div>
            <h2>Hi I am users</h2>
            <p>Hooks POCss</p>
            <p>{val}</p>
            <button onClick={() => setVal('changed values')}>Change value</button>
            {list}
            <h2>List by store </h2>
            {list2}

            <div>Create new user :</div>
            <input value={newUserName} onChange={(event) => setUserName(event.target.value)}/>
            <button
                onClick={() => {
                    props.userAction({
                        type: 'ADD',
                        name: newUserName
                    })
                }}
            >Add new User
            </button>
        </div>
    );
}