import React, {useState} from 'react';
import PropTypes from 'prop-types';


export function Users(props) {
    const [val, setVal] = useState('default value');
    
    return (
        <div>
            <h2>Hi I am users</h2>
            <p>Hooks POCss</p>
            <p>{val}</p>
            <button onClick={() => setVal('changed values')}>Change value</button>
        </div>
    );
}