import axios from 'axios'
import { START_NEW_CHAT, CLOSE_CHAT, CHAT_SIZE, NEW_MESSAGE, FETCH_MESSAGE_HISTORY } from './actionTypes'


// Gets message history and opens new popup for desired user
export const startNewChat = (userID, id, name, imgUrl, activeChats) => {
    return dispatch => {
        dispatch(fetchMessageHistory(userID, id, activeChats));
        dispatch(setNewChat(id, name, imgUrl));
    }
}

export const setNewChat = (id, name, imgUrl) => {
    const chat = { "id": id, "name": name, "imgUrl": imgUrl, "big": true, "active": true }
    return {
        type: START_NEW_CHAT,
        payload: chat
    }
}

// Closes desired chat popup
export const closeChat = (id) => {
    return {
        type: CLOSE_CHAT,
        payload: id
    }
}

// Switches desired chat size
export const chatSizeHandler = (id) => {
    return {
        type: CHAT_SIZE,
        payload: id
    }
}

// On new message event
export const newMessageHandler = (message, params) => {
    return dispatch => {
        message.params = params
        dispatch(setNewMessageHandler(message))
    }
}

export const setNewMessageHandler = (message) => {
    return {
        type: NEW_MESSAGE,
        payload: message
    }
}

// Fetches message history between desired and logged in user
export const fetchMessageHistory = (fromID, toID, activeChats) => {
    return dispatch => {

        if (activeChats.filter(e => e.id === toID).length === 0) {
            axios.get('http://asocial-network-api.herokuapp.com/api/chat/' + fromID + "/" + toID)
                .then(res => {
                    dispatch(setFetchMessageHistory(res, toID))
                }).catch(err => {
                    console.log(err)
                })
        }

    }
}

export const setFetchMessageHistory = (data, toID) => {
    data.to = toID;
    return {
        type: FETCH_MESSAGE_HISTORY,
        payload: data
    }
}