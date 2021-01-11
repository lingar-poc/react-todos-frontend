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
    }
}

export function DataAction(action) {
    this.localStorage = action.localStorage;
    this.actionType = action.actionType;
    this.item = action.item;
    this.itemType = action.itemType;

}

