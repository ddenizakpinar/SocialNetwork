import React, { useState, useEffect } from 'react'
import Chatt from '../components/Chatt/Chatt'
import * as chatActions from '../store/actions/chatActions'
import { connect } from 'react-redux'
import useSocket from 'use-socket.io-client';
const ENDPOINT = "http://asocial-network-api.herokuapp.com";

const ChatContainer = props => {

    const [chatMessage, setChatMessage] = useState([])

    const startNewChatHandler = (id, name, imgUrl) => {
        props.onNewChat(props.user.userInfo.data.result._id, id, name, imgUrl, props.chat.activeChats)
    }
    const setChatMessageHandler = (id, message) => {
        setChatMessage({ ...chatMessage, [id]: message })
    }

    const [socket] = useSocket(ENDPOINT);

    useEffect(() => {
        socket.connect();

        socket.on(props.user.userInfo.data.result._id, (message) => {
            props.onNewMessage(message, 1)
        })

        // eslint-disable-next-line 
    }, [props.user.userInfo.data.result._id, socket]);

    const submitChatMessage = (id) => {
        return event => {
            event.preventDefault();
            setChatMessage({ ...chatMessage, [id]: "" });
            const message = {
                from: props.user.userInfo.data.result._id,
                to: id,
                message: chatMessage[id],
                date: Date.now()
            }

            props.onNewMessage(message, 0)
            socket.emit("chat message", message);
        }
    }
    return (
        <div>
            <Chatt
                chat={props.chat?.allMessages}
                list={props.user?.userInfo?.data?.result?.friends}
                chats={props.chat.activeChats}
                onCloseChat={props.onCloseChat}
                onStartNewChat={startNewChatHandler}
                onChangeSize={props.onChangeSize}
                onSubmitChatMessage={submitChatMessage}
                chatMessage={chatMessage}
                setChatMessageHandler={setChatMessageHandler}
                userID={props.user.userInfo.data.result._id}
                openChatOnMobile={props.openChatOnMobile}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat
})

const mapDispatchToProps = dispatch => {
    return {
        onNewChat: (userID, id, name, imgUrl, activeChats) => dispatch(chatActions.startNewChat(userID, id, name, imgUrl, activeChats)),
        onCloseChat: (id) => dispatch(chatActions.closeChat(id)),
        onChangeSize: (id) => dispatch(chatActions.chatSizeHandler(id)),
        onNewMessage: (message, params) => dispatch(chatActions.newMessageHandler(message, params))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)

