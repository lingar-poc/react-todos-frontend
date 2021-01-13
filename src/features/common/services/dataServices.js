import {v4 as uuidv4} from "uuid";

const itemName = "todos";

function getData(dataAction) {


}

export function SaveData(dataAction) {
    if (localStorage) {

    }

}

export function removeData() {

}

//todo - get, add, delete , update (mark)
export function handleData(dataAction) {
    const action = new DataAction(dataAction);
    //todo function for localstorage and liveServer separately
   if (dataAction.localStorage){
        return localStorageDataManagement(action.actionType, action.item);
   }

}

export function DataAction(action) {
    this.localStorage = action.localStorage;
    this.actionType = action.actionType;
    this.item = action.item;
    this.itemType = action.itemType;
    this.id = action.id;

}

function localStorageDataManagement(actionType, item) {


    switch (actionType) {
        case (actionType === "GET"): {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            return Promise.resolve(data);
        }
        case (actionType === "POST"): {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            item['id'] = uuidv4();
            data.push(item);
            localStorage.setItem(itemName, JSON.stringify(data));
            return Promise.resolve(item);

        }
    }

    // case (actionType.actionType === "SAVE"): {
    //     let data;
    //     localStorage.getItem(actionType.itemType) ? data = JSON.parse( localStorage.getItem(actionType.itemType)) : data = [];
    //     data.push(actionType.item);
    //     localStorage.setItem('users', JSON.stringify(data));
    //
    //
    // }
    // case(actionType.actionType === "REMOVE"):{
    //     let data;
    //     localStorage.getItem(actionType.itemType) ? data = JSON.parse( localStorage.getItem(action.itemType)) : data = [];
    //     console.log("localstorage before remove", data);
    //
    //     let itemToRemove = data.findIndex((item)=>{
    //         return  item.id === actionType.id
    //     });
    //     console.log("index ? " + itemToRemove, actionType.id)
    //
    //     if (itemToRemove>-1){
    //         // itemToRemove === 0 ?  data.selectedUser = data.todos[1].id: data.selectedUser = data.todos[0].id;
    //         console.log("index ? " + itemToRemove)
    //         data.splice(itemToRemove, 1 );
    //         console.log("localstorage after remove", data);
    //
    //         localStorage.setItem('users', JSON.stringify(data));
    //
    //     }
    //     // data.push(action.item);
    //     // localStorage.setItem('todos', JSON.stringify(data));
    //
    // }


}
