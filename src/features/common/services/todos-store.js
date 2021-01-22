import {DataAction, handleData} from "./data-services";

//TODO - do it with promises support
export function manageStore(todosStore, action) {
    console.log("manage store")
    switch (action.type) {
        case 'GET':{
            console.log(todosStore)
            return {
                ...todosStore,
                selectedUser: action.id,
                todos: action.todos
            }
        }//todo

        case 'POST': {
            console.log("description = " , action.description)
            if (action.description === "") {
                alert("Description cannot be empty");
                return {...todosStore};
            }
            const item = {description: action.description, mark: false};
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: action.type,
                    item: item,
                }
            );
            handleData(dataAction);
            todosStore.todos.push(item);
            return {...todosStore};
        }

        case 'DELETE': {
            let itemToRemove = todosStore.todos.findIndex((item) => {
                return item.id === action.id
            });
            if (itemToRemove > -1) {
                todosStore.todos.splice(itemToRemove, 1);
            }

            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'DELETE',
                    item: {id: action.id}
                }
            );
            handleData(dataAction);
            return {
                ...todosStore
            }
        }
        case 'UPDATE': {
            let itemToUpdate = todosStore.todos.findIndex((item) => {
                return item.id === action.id
            });

            if (itemToUpdate > -1) {
                todosStore.todos[itemToUpdate].mark = action.mark;
            }

            console.log("todosStore.selectedUser =", todosStore.todos[itemToUpdate]);
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'UPDATE',
                    item: {id: action.id, mark: action.mark}
                }
            );
            handleData(dataAction);
            return {
                ...todosStore,

            }
        }

        default:
            return todosStore;
    }

}
