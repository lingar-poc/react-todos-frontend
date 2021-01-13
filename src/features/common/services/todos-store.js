import {v4 as uuidv4} from "uuid";
import {DataAction, handleData} from "./dataServices";

//TODO - do it with promises support
export function manageStore(todosStore, action) {
    console.log("Manage store");
    switch (action.type) {
        case 'GET'://todo
            return {
                ...todosStore,
                selectedUser: action.id,
            }
        case 'POST': {
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
            console.log("jjj")

            if (itemToRemove > -1) {
                // usersStore.selectedUse = "5a8eb49b-d36b-457d-9b18-b757bbd99053";
                // usersStore.todos = usersStore.todos.splice(itemToRemove, 1 );
                todosStore.todos.splice(itemToRemove, 1);


                console.log("todos ? ", todosStore.todos, todosStore.todos.find(user => user.id === todosStore.todos[1].id));
                console.log(todosStore.todos);
                // newArr = todosStore.todos.splice(itemToRemove, 1 );
                // todosStore.todos = todosStore.todos.splice(itemToRemove, 1 );

            }

            console.log("todosStore.selectedUser =", todosStore);
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'DELETE',
                    item:{id: action.id}
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
