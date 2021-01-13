import React, {useState} from 'react';

/**
 * TODO :
 * - convert to todos
 * - Make style simple radius border, with some padding.
 * - Make circle symbol which changed.
 * @param props -id
 * @returns {*}
 * @constructor
 */
export function Todo(props) {
    const [mark, tick] = useState(false);
    return (
        <div className={"todo " + (mark ? " done" : "not-done")}>
            <div className="description">{mark ? "DONE!" : "TODO..."} : {props.description}</div>
            <div className="mark delete" onClick={() => alert("TODO - delete action")}>
                <span className="icon">Delete  &#9747;</span>
            </div>
            <div className="mark" onClick={() => tick(!mark)}>
                <span className="icon"> {mark ? <span>status = &#9745; Undo</span> : <span>status =  &#9746; Do </span>}
                </span>
            </div>
        </div>
    );
}