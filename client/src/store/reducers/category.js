import {  GET_ALL_CATEGORY, GET_CATEGORY_ID, ADD_CATEGORY } from "../actions/actionType";
const initialState = {
    categories : [],
    category: {},
    newCategory: {}
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case GET_CATEGORY_ID:
            return{
                ...state,
                category: action.payload
            }
        case ADD_CATEGORY: 
            return {
                ...state,
                newCategory: action.payload
            }

    
        default:
            return state;
    }
}