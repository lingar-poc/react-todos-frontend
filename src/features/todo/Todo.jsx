import React from 'react';

export function Todo(props) {
    return (
        <div className={"todo " + (props.mark ? " done" : "not-done")}>
            <div className="description">{props.mark ? "DONE!" : "TODO..."} : {props.description}</div>
            <div className="mark delete" onClick={() => props.action({
                type: "DELETE",
                id: props.id
            })}>
                <span className="icon">Delete  &#9747;</span>
            </div>
            <div className="mark" onClick={() =>{
                props.action({
                    type: "UPDATE",
                    id: props.id,
                    mark: !props.mark
                })
            }}>
                <span className="icon"> {props.mark ? <span>status = &#9745; Undo</span> : <span>status =  &#9746; Do </span>}
                </span>
            </div>
        </div>
    );
}