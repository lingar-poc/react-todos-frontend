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
        else if(action.actionType === "REMOVE"){
            let data;
            localStorage.getItem(action.itemType) ? data = JSON.parse( localStorage.getItem(action.itemType)) : data = [];
            console.log("localstorage before remove", data);

            let itemToRemove = data.findIndex((item)=>{
                return  item.id === action.id
            });
            console.log("index ? " + itemToRemove, action.id)

            if (itemToRemove>-1){
                // itemToRemove === 0 ?  data.selectedUser = data.users[1].id: data.selectedUser = data.users[0].id;
                console.log("index ? " + itemToRemove)
                data.splice(itemToRemove, 1 );
                console.log("localstorage after remove", data);

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
    this.id = action.id;

}

