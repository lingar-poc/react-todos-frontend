import {v4 as uuidv4} from "uuid";

const itemName = "todos";
/**
 * Change this for change the second of the demo delay.
 * @type {number}
 */
const delayDemo = 1;


export function localStorageDataManagementWithPromises(actionType, item) {
    console.log("localStorageDataManagementWithPromises");

    switch (actionType) {
        case 'GET': {
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve(data);
                }, delayDemo * 1000);
            });

        }
        case 'POST': {
            console.log("adding item ", item)

            //error demo:
            if (item.description === 'error') {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        return reject("error demo");
                    }, delayDemo * 1000);
                });
            }
            let data = [];
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            item['id'] = uuidv4();
            data.push(item);
            localStorage.setItem(itemName, JSON.stringify(data));
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve(item);
                }, delayDemo * 1000);
            });
        }

        case"UPDATE": {
            console.log("Update item mark at localstorage. ")
            let data;
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];

            //getting the array index to update
            let itemToUpdate = data.findIndex((el) => {
                return item.id === el.id
            });

            if (itemToUpdate > -1) {
                data[itemToUpdate].mark = item.mark;
                localStorage.setItem(itemName, JSON.stringify(data));
            }
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve(item);
                }, delayDemo * 1000);
            });
        }

        case "DELETE": {
            console.log("delete from localstorage... ")
            let data;
            localStorage.getItem(itemName) ? data = JSON.parse(localStorage.getItem(itemName)) : data = [];
            let itemToRemove = data.findIndex((el) => {
                return item.id === el.id
            });

            if (itemToRemove > -1) {
                data.splice(itemToRemove, 1);
                localStorage.setItem(itemName, JSON.stringify(data));

            }
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve(item);
                }, delayDemo * 1000);
            });

        }
        default:
            return Promise.reject();
    }
}