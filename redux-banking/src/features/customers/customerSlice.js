import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    customerId: "",
    createdAt: ""
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer:{
            prepare(name,id){
                return {payload: {name, id, createdAt : new Date().toISOString()}}
            },
            reducer(state, action){
                state.fullName = action.payload.name;
                state.customerId = action.payload.id;
                state.createdAt = action.payload.createdAt
            }
        },
        updateCustomer(state, action){
            state.fullName = action.payload
        }
    }
});

export const {createCustomer, updateCustomer} = customerSlice.actions;

export default customerSlice.reducer;

//Reducer and action function before RTK

// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer": return {...state,
//             fullName: action.payload.name,
//             customerId: action.payload.id,
//             createdAt: action.payload.createdAt
//         }
//         case "customer/updateName": return {...state, fullName: action.payload}
//         default: return state;
//     }
// }
//
// export function createCustomer(name, id){
//     return { type: "customer/createCustomer",
//         payload : {name, id, createdAt: new Date().toISOString()}
//     }
// }
//
// export function updateName(name){
//     return { type: "customer/updateName", payload: name}
// }