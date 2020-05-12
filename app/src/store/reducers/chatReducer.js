import { START_NEW_CHAT, CLOSE_CHAT, CHAT_SIZE, NEW_MESSAGE, FETCH_MESSAGE_HISTORY } from '../actions/actionTypes'

const initialState = {
    activeChats: [],
    allMessages: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_NEW_CHAT:
            // On start new chat it controls that max number of chats and prevents reopens
            let activeChatsCopy = state.activeChats;
            if (activeChatsCopy.filter(e => e.active === true).length < 4) { 
                if (activeChatsCopy.filter(e => e.id === action.payload.id).length === 0) {
                    activeChatsCopy.push(action.payload)
                } else {
                    activeChatsCopy.find(user => user.id === action.payload.id).active = true;
                }
            }
            return {
                ...state,
                activeChats: activeChatsCopy
            };

        case CLOSE_CHAT:
            // On close chat it switches active status to false
            state.activeChats.find(user => user.id === action.payload).active = false;
            return {
                ...state,
                activeChats: state.activeChats
            }
        case CHAT_SIZE:
            // Controls that chat is open and switches its size
            let activeChatsCopy2 = state.activeChats;
            if (activeChatsCopy2.filter(e => e.id === action.payload).length === 1) { // CHECK THAT IF EXISTS
                activeChatsCopy2.filter(e => e.id === action.payload)[0].big = !activeChatsCopy2.filter(e => e.id === action.payload)[0].big
            }
            return {
                ...state,
                activeChats: activeChatsCopy2
            }
        case NEW_MESSAGE:
            // On new message it basically add it to the state
            let copyArray = state.allMessages;
            let id;
            id = action.payload.params === 0 ? action.payload.to : action.payload.from;
            if (state.allMessages[id]?.filter(e => e.date === action.payload.date).length === 0) {
                if (copyArray[id] == null) {
                    copyArray = {
                        ...copyArray,
                        [id]: [
                            action.payload
                        ]
                    }
                } else {
                    copyArray = {
                        ...copyArray,
                        [id]: [
                            action.payload,
                            ...copyArray[id]
                        ]
                    }
                }
                return {
                    ...state,
                    allMessages: copyArray
                }
            }
            return {
                ...state,
            }

        // Fetches old messages and adds them to the state
        case FETCH_MESSAGE_HISTORY:
            let idd = action.payload.to;
            let copyArray2 = state.allMessages;
            if (copyArray2[idd] == null) {
                copyArray2 = {
                    ...copyArray2,
                    [idd]: [
                        ...action.payload.data
                    ]
                }
            } else {
                copyArray2 = {
                    ...copyArray2,
                    [idd]: [
                        ...copyArray2[idd],
                        ...action.payload.data
                    ]
                }
            }
            return {
                ...state,
                allMessages: copyArray2
            }
        default:
            return state;
    }
}