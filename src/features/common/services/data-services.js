import {v4 as uuidv4} from "uuid";

const itemName = "todos";

export function handleData(dataAction) {
    const action = new DataAction(dataAction);
    //TODO function for localstorage and liveServer separately
    if (action.localStorage) {
        return localStorageDataManagement(action.actionType, action.item);
    }

}


async function localStorageDataManagement(actionType, item) {

    switch (actionType) {
        case 'GET': {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
        }
            break;
        case 'POST': {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            item['id'] = uuidv4();
            data.push(item);
            localStorage.setItem(itemName, JSON.stringify(data));
        }
            break;

        case"DELETE": {
            let data;
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            let itemToRemove = data.findIndex((el) => {
                return item.id === el.id
            });

            if (itemToRemove > -1) {
                data.splice(itemToRemove, 1);
                localStorage.setItem(itemName, JSON.stringify(data));

            }

        }
            break;

        case"UPDATE": {
            let data;
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];

            let itemToUpdate = data.findIndex((el) => {
                return item.id === el.id
            });

            if (itemToUpdate > -1) {
                data[itemToUpdate].mark = item.mark;
                localStorage.setItem(itemName, JSON.stringify(data));

            }

        }
            break;
        default:
            return null;
    }

}

//TODO
export function localStorageDataManagementWithPromises(actionType, item) {
    const delayDemo = 3;


    switch (actionType) {
        case 'GET': {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    return resolve(data);
                }, delayDemo * 1000);
            });

        }
        break;
        case 'POST': {
            //error demo:
            console.log("adding item ", item)
            if(item.description === 'error'){
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        return reject("error demo");
                    }, delayDemo * 1000);
                });
            }
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            item['id'] = uuidv4();
            data.push(item);
            localStorage.setItem(itemName, JSON.stringify(data));
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    return resolve(item);
                }, delayDemo * 1000);
            });
        }
        default:
            return Promise.reject();
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

//prototype for data action variable
export function DataAction(action) {
    this.localStorage = action.localStorage;
    this.actionType = action.actionType;
    this.item = action.item;
}