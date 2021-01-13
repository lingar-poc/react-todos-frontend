import React, {useState, useEffect} from 'react';
export function Dashboard(props) {
    useEffect((a,b)=>{
        console.log("what? ", props.user);
        console.log("a = " , a , "b=", b);

    });
    return(<h2>User is {props.user.name}</h2>)

}