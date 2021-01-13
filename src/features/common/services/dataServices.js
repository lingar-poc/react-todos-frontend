function getData(dataAction) {


}

export function SaveData(dataAction) {
    if (localStorage) {

    }

}

export function removeData() {

}

export function handleData(dataAction) {
    const action = new DataAction(dataAction);
    if (action.localStorage) {
        if (action.actionType === "SAVE") {
            let data;
            localStorage.getItem(action.itemType) ? data = JSON.parse( localStorage.getItem(action.itemType)) : data = [];
            data.push(action.item);
            localStorage.setItem('users', JSON.stringify(data));


        }
        else if(action.localStorage === "REMOVE"){
            let data;
            localStorage.getItem(action.itemType) ? data = JSON.parse( localStorage.getItem(action.itemType)) : data = [];
            let itemToRemove = data.users.findIndex((item)=>{
                return  item.id === action.id
            });
            if (itemToRemove>-1){
                itemToRemove === 0 ?  data.selectedUser = data.users[1].id: data.selectedUser = data.users[0].id;

                data.users.splice(itemToRemove, 1 );
                console.log("data ? ",data.users, data.users.find(user => user.id === data.users[1].id) );
                localStorage.setItem('users', JSON.stringify(data));

            }
            // data.push(action.item);
            // localStorage.setItem('users', JSON.stringify(data));

        }
    }
}

export function DataAction(action) {
    this.localStorage = action.localStorage;
    this.actionType = action.actionType;
    this.item = action.item;
    this.itemType = action.itemType;

}

