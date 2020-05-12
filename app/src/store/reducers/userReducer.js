import { SEARCH_USER, GET_USER_INFO, FETCH_USER_INFO_BY_ID } from '../actions/actionTypes';


const initialState = {
    userInfo: {},
    searchResult: [],
    profileUser: {},
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER:
            return {
                ...state,
                searchResult: action.payload
            };
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
                loading: false
            };
        case FETCH_USER_INFO_BY_ID:
            return {
                ...state,
                profileUser: action.payload
            }
        default:
            return state;

    }
}