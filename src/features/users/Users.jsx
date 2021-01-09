import React, {useState} from 'react';
import PropTypes from 'prop-types';


export function Users(props) {
    const [val, setVal] = useState('default value');
    const list = props.data.map((item, idx) => {
        return <div key={idx}>Name = {item.name}</div>
    })
    const list2 = props.store.users.map((item, idx) => {
        return (
            <div key={idx}
                 className={props.store.selectedUser === item.id ? 'selectedUser' : ''}
                onClick={()=>{
                    props.select({
                        type: 'select',
                        id: item.id
                    })
                }}
            >
                Name = {item.name}</div>
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
        </div>
    );
}