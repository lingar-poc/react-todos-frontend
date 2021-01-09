import React, {useState} from 'react';
import PropTypes from 'prop-types';


export function Users(props) {
    const [val, setVal] = useState('default value');
    const list = props.data.map((item, idx)=>{
        return<div key={idx}>Name = {item.name}</div>
    })
    
    return (
        <div>
            <h2>Hi I am users</h2>
            <p>Hooks POCss</p>
            <p>{val}</p>
            <button onClick={() => setVal('changed values')}>Change value</button>
            {list}
        </div>
    );
}