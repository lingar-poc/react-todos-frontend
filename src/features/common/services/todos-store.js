/**Funtion for manage the store
 *
 * @param todosStore the exist store with the current state
 * @param action - action that contain the passed state changes
 */
import {localDataService, serverDataService} from "./data-services";

export function manageStore(todosStore, action) {
    console.log("manage store");
    switch (action.type) {
        case 'LOADING': {
            console.log("change loading")
            return {
                ...todosStore,
                loading: action.loading
            }
        }
        case 'GET': {
            console.log("get the data and assign it to the store. data =  ", action.todos);
            return {
                ...todosStore,
                todos: action.todos
            }
        }
        case 'POST': {
            console.log("Add new item to the store. item = ", action.newItem);
            todosStore.todos.push(action.newItem);
            return {...todosStore};
        }
        case 'DELETE': {
            console.log("delete item from store. item = ", action.item);
            //getting the right index
            let itemToRemove = todosStore.todos.findIndex((item) => {
                return item.id === action.item.id;
            });
            if (itemToRemove > -1) {
                todosStore.todos.splice(itemToRemove, 1);
            }
            return {
                ...todosStore
            }
        }

        case 'UPDATE': {
            console.log("change the item mark - item = ", action.item);
            let itemToUpdate = todosStore.todos.findIndex((item) => {
                return item.id === action.item.id;
            });
            if (itemToUpdate > -1) {
                todosStore.todos[itemToUpdate].mark = action.item.mark;
            }
            return {
                ...todosStore
            }
        }

        case 'LOCAL_STORAGE': {
            console.log("Setting the data service to localstorage Lingar");
            todosStore.dataService = localDataService;
            return {
                ...todosStore
            }
        }

        case 'SERVER': {
            console.log("Setting the data service to SERVER");
            todosStore.dataService = serverDataService;
            return {
                ...todosStore
            }
        }
        default:
            return todosStore;
    }

}

//setting two differents dataServices

