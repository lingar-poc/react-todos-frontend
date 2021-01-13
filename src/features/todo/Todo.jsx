import React, {useState} from 'react';

/**
 * TODO :
 * - convert to todos
 * - Make style simple radius border, with some padding.
 * - Make circle symbol which changed.
 * @param props
 * @returns {*}
 * @constructor
 */
export function Todo(props) {
    const [mark, tick] = useState(false);


    return (
        <div className={"todo " +(mark ? " done" : "not-done")}>
            <div className="description">TODO : {props.description}</div>
            <div className= "mark">X</div>
        </div>
    );
}