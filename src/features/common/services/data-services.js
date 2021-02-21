import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {BASE_URL} from "../../app-constants";

const itemName = "todos";
/**
 * Change this for change the second of the demo delay.
 * @type {number}
 */
const delayDemo = 1;//todo - interface with java script
export function DataService(func) {
    this.webService = func;
}

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
            console.log("adding item to localstorage ", item)

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


export function serverDataManagementWithPromises(actionType, item) {
    console.log("localStorageDataManagementWithPromises");

    switch (actionType) {
        case 'GET': {
            // console.log("getData from service!");
            //Send call to http://localhost:8080/ws/getTodos
            return axios.get(BASE_URL + "todoAction").then((res) => res.data);
        }

        //Other calls still not working
        /**
         * Post to todoAction
         * Item, with description and mart (item here is described like that)
         * The id generated at server side and returns.
         */
        case 'POST': {
            console.log("adding item to server", item)

            //error demo:
            if (item.description === 'error') {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        return reject("error demo");
                    }, delayDemo * 1000);
                });
            }
            return axios.post(BASE_URL + "todoAction", item).then((res) => {
                    console.log("response = ", res);
                    return res.data;
                }
            );
        }
        /**
         * Update to todoAction
         * Item, with id as simple string
         */
        case"UPDATE": {
            const config = {
                headers: {
                    'Content-Type': 'text/plain'
                },
                responseType: 'text'
            };
            return axios.put(BASE_URL + "todoAction", item.id, config)
                .then(() => item);
        }

        /**
         * Delete to todoAction
         * Item, with id as simple string
         */
        case "DELETE": {
            console.log("delete from server... ");
            const config = {
                headers: {
                    'Content-Type': 'text/plain'
                },
                responseType: 'text',
                data: item.id
            };
            return axios.delete(BASE_URL + "todoAction",  config)
                .then(() => item);
        }
        default:
            return Promise.reject();
    }
}

export const localDataService = new DataService(localStorageDataManagementWithPromises);
export const serverDataService = new DataService(serverDataManagementWithPromises);