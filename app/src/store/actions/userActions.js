import axios from 'axios'
import { SEARCH_USER, GET_USER_INFO, FETCH_USER_INFO_BY_ID } from './actionTypes'

// Searches user by name
export const searchUser = (name) => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/users/search/' + name).then(res => {
            dispatch(setSearchResult(res))
        })
    }
}

export const setSearchResult = res => {
    return {
        type: SEARCH_USER,
        payload: res
    };
};

// Gets user info by userID (Such as profile img, name)
export const getUserInfoById = (id) => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/users/infoByID/' + id).then(res => {
            dispatch(setUserInfoById(res))
        })
    }
}
export const setUserInfoById = res => {
    return {
        type: FETCH_USER_INFO_BY_ID,
        payload: res
    };
};

// Gets logged in user info (Such as profile img, name, friend requests...)
export const getInfo = () => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/users/info').then(res => {
            dispatch(setUserInfo(res));
        })
    }
}

export const setUserInfo = res => {
    return {
        type: GET_USER_INFO,
        payload: res
    };
};

// Sends friend request by userID
export const sendFriendRequest = (userID,input) => {
    return dispatch => {
        axios.post('http://asocial-network-api.herokuapp.com/api/users/friendrequest/' + userID).then(res => {
        dispatch(searchUser(input))
        }).catch(err => console.log(err))
    }
}

// Accepts friend request by userID
export const acceptFriendRequest = userID => {
    return dispatch => {
        axios.post('http://asocial-network-api.herokuapp.com/api/users/friend/' + userID).then(res => {
            dispatch(getInfo());
        }).catch(err => console.log(err))
    }
}

// Declines friend request by userID
export const removeFriendRequest = userID => {
    return dispatch => {
        axios.delete('http://asocial-network-api.herokuapp.com/api/users/friendrequest/' + userID).then(res => {
            dispatch(getInfo());    
        }).catch(err => console.log(err))
    }
}