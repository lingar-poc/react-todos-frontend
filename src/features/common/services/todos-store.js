import {v4 as uuidv4} from "uuid";
import {DataAction, handleData} from "./dataServices";

export function  manageStore(todosStore, action) {
    switch (action.type) {
        case 'GET'://todo

            return {
                ...todosStore,
                selectedUser: action.id,
            }
        case 'POST': {
            console.log("add...", action)
            console.log("add2...", todosStore.todos);

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
            console.log("xzcx");

            todosStore.todos.push(item);



             handleData(dataAction).then(item => {
                console.log("item = ?? ", todosStore.todos)
                // todosStore.todos.push(item);
                return {
                    ...todosStore
                }
            }, (err) => {
                console.error("error occurred - ", err);
                return {...todosStore};
            });
            console.log("getting here ???")
            return {...todosStore};


        }
            break;

        case 'REMOVE': {
            console.log("remove...", todosStore.users);
            let itemToRemove = todosStore.users.findIndex((item) => {
                return item.id === action.id
            });
            console.log("after...", todosStore.users);

            console.log('idx = ' + itemToRemove);
            let newArr = [];
            if (itemToRemove > -1) {
                // usersStore.selectedUse = "5a8eb49b-d36b-457d-9b18-b757bbd99053";
                // usersStore.todos = usersStore.todos.splice(itemToRemove, 1 );
                todosStore.users.splice(itemToRemove, 1);


                console.log("todos ? ", todosStore.users, todosStore.users.find(user => user.id === todosStore.users[1].id));
                console.log(todosStore.users);
                itemToRemove === 0 ? todosStore.selectedUser = todosStore.users[1].id : todosStore.selectedUser = todosStore.users[0].id;
                // newArr = usersStore.todos.splice(itemToRemove, 1 );
                // usersStore.todos = usersStore.todos.splice(itemToRemove, 1 );

            }

            console.log("usersStore.selectedUser =", todosStore);
            let dataAction = new DataAction(
                {
                    localStorage: true,
                    actionType: 'REMOVE',
                    itemType: 'users',
                    id: action.id
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
