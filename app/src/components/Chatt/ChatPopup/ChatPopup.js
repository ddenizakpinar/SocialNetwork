import React from 'react'

import classes from './ChatPopup.module.css'

const ChatPopup = props => {
    const left = (msg) => {
        return (
            <div key={msg.date} className={classes.leftChat}>
                {msg.message}
            </div>
        );
    }

    const right = (msg) => {
        return (
            <div key={msg.date} className={classes.rightChat}>
                {msg.message}
            </div>
        );
    }
    console.log(props.imgUrl);
    return (
        
        props.big === true ?
            <div>
                <div style={{ right: props.right }} className={classes.display}>
                    <div  className={classes.top}>
                        <div onClick={() => { props.onChangeSize(props.id) }} className={classes.userInfo}>
                            <img className={classes.img} src={"http://asocial-network-api.herokuapp.com/image/"+props.imgUrl} alt=""></img>
                            <div className={classes.userName}>{props.text}</div>
                        </div>
                        <button className={classes.closeButton} onClick={() => { props.onCloseChat(props.id) }}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className={classes.chatBody}>
                        {
                            props.userChat?.map((msg, index) => {
                                return (
                                    msg.from !== props.userID ?
                                        left(msg)
                                        : right(msg)
                                );
                            })
                        }
                    </div>
                    <form className={classes.inputContainer} onSubmit={props.onSubmitChatMessage(props.id)}>
                        <input value={props.chatMessage[props.id] || ""} onChange={(e) => { props.setChatMessageHandler(props.id, e.target.value) }} className={classes.input} placeholder="Type a message..."></input>
                        <button type='submit' className={classes.sendButton}>
                            <i className="fas fa-share"></i>
                        </button>
                    </form>
                </div>
            </div>
            :
            <div>
                <div className={classes.smallContainer}>
                    <div onClick={() => { props.onChangeSize(props.id) }} className={classes.small}>

                        <div className={classes.userInfo}>
                            <img className={classes.img} src={"http://asocial-network-api.herokuapp.com/image/"+props.imgUrl} alt=""></img>
                            <div className={classes.userName}>{props.text}</div>
                        </div>
                        <button className={classes.closeButton} onClick={() => { props.onCloseChat(props.id) }}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default ChatPopup
