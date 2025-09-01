import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance: 0,
    loanAmount: 0,
    loanPurpose: ''
}

function accountReducer(state = initialStateAccount, action){
    switch (action.type) {
        case "account/deposit": return {...state, balance: state.balance + action.payload}
        case "account/withdraw": return {...state, balance: state.balance - action.payload}
        case "account/requestLoan": if(state.loanAmount > 0) return state;
        return {...state, 
            balance: state.balance + action.payload.amount, 
            loanAmount: action.payload.amount,
            loanPurpose: action.payload.purpose}
        case "account/payLoan": return {...state, loanAmount: 0, loanPurpose: "",
            balance: state.balance - state.loanAmount}
        default: return state;
    }
}

function deposit(amount){
    return {type: "account/deposit", payload: amount}
}

function withdraw(amount){
    return {type: "account/withdraw", payload: amount}
}
function requestLoan(amount, purpose){
    return {type: "account/requestLoan", payload: {
            amount, purpose
        }}
}
function payLoan(amount){
    return {type: "account/payLoan"}
}

// const store = createStore(accountReducer);

const initialStateCustomer = {
    fullName: "",
    customerId: "",
    createdAt: ""
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer": return {...state, 
            fullName: action.payload.name,
            customerId: action.payload.id,
            createdAt: action.payload.createdAt
        }
        case "customer/updateName": return {...state, fullName: action.payload}
        default: return state;
    }
}

function createCustomer(name, id){
    return { type: "customer/createCustomer",
        payload : {name, id, createdAt: new Date().toISOString()}
    }
}

function updateName(name){
    return { type: "customer/updateName", payload: name}
}

const rootReducer = combineReducers({accountReducer, customerReducer});
const store = createStore(rootReducer);

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(100));
console.log(store.getState());
store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());
store.dispatch(payLoan())

store.dispatch(createCustomer("Moni", 1234))
console.log(store.getState());
store.dispatch(updateName("Monica"))
console.log(store.getState());