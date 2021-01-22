import React, {useState} from 'react';
import {localStorageDataManagementWithPromises} from "../common/services/data-services";

export function Todo(props) {
    // const [mark, setMark ] = useState(props.mark);
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
                    type: "LOADING",
                    loading: true
                });
                localStorageDataManagementWithPromises("UPDATE", {id: props.id, mark: !props.mark})
                    .then((item)=>{
                        props.action({
                            type: "UPDATE",

                            item: item
                        })
                    }).then(()=>{
                    props.action({
                        type: "LOADING",
                        loading: false
                    });
                })

            }}>
                <span className="icon"> {props.mark ? <span>status = &#9745; Undo</span> : <span>status =  &#9746; Do </span>}
                </span>
            </div>
        </div>
    );
}