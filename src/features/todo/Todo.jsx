import React, {useState} from 'react';
import {localStorageDataManagementWithPromises} from "../common/services/data-services";

export function Todo(props) {
    // const [mark, setMark ] = useState(props.mark);
    return (
        <div className={"todo " + (props.mark ? " done" : "not-done")}>
            <div className="description"><b>{props.mark ? "DONE!" : "TODO:"}</b> {props.description}
            <br/>
                <span className="icon"> {props.mark ? <span>status = &#9745; </span> :
                    <span>status =  &#9746;  </span>}
                </span></div>
            <div className="action-area delete" onClick={() => {
                props.action({
                    type: "LOADING",
                    loading: true
                });
                localStorageDataManagementWithPromises("DELETE", {id: props.id})
                    .then((item) => {
                        props.action({
                            type: "DELETE",
                            item: item
                        })
                    }).then(() => {
                    props.action({
                        type: "LOADING",
                        loading: false
                    });
                });
            }
            }>
                <span className="icon">Delete  &#9747;</span>
            </div>
            <div className="action-area" onClick={() => {
                props.action({
                    type: "LOADING",
                    loading: true
                });
                localStorageDataManagementWithPromises("UPDATE", {id: props.id, mark: !props.mark})
                    .then((item) => {
                        props.action({
                            type: "UPDATE",

                            item: item
                        })
                    }).then(() => {
                    props.action({
                        type: "LOADING",
                        loading: false
                    });
                })

            }}>
                <span className="icon"> {props.mark ? <span> Undo</span> :
                    <span>Do </span>}
                </span>
            </div>
        </div>
    );
}