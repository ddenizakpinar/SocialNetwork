import React from 'react'
import classes from './Chatt.module.css'
import ChatCard from './ChatCard/ChatCard'
import ChatPopup from './ChatPopup/ChatPopup'
import { useWindowSize } from '@react-hook/window-size'

const Chatt = props => {

    const [width] = useWindowSize()

    return (
        <>
            {
                props.openChatOnMobile || width > 650 ?
                    <>
                        <div className={classes.container}>
                            {
                                <div className={classes.display}>
                                    <div className={classes.text}>Contacts</div>
                                    {
                                        props.list?.map((item, index) => {
                                            return (
                                                <div key={index} className={classes.cardContainer}>
                                                    <ChatCard
                                                        paddingBottom={"10px"}
                                                        paddingTop={"10px"}
                                                        id={item._id}
                                                        name={item.name}
                                                        image={item.imgUrl}
                                                        onStartNewChat={props.onStartNewChat}
                                                    ></ChatCard>
                                                    <div style={{ borderBottom: "1px solid #29272E" }}></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }

                        </div>
                        <div className={classes.chatAreaContainer}>
                            <div className={classes.chatArea}>
                                {
                                    props.chats.map((item, index) => {
                                        return (
                                            item.active === true ?
                                                <ChatPopup
                                                    userID={props.userID}
                                                    userChat={props.chat[item.id]}
                                                    id={item.id}
                                                    key={index}
                                                    onCloseChat={props.onCloseChat}
                                                    index={index}
                                                    text={item.name}
                                                    imgUrl={item.imgUrl}
                                                    big={item.big}
                                                    onChangeSize={props.onChangeSize}
                                                    onSubmitChatMessage={props.onSubmitChatMessage}
                                                    chatMessage={props.chatMessage}
                                                    setChatMessageHandler={props.setChatMessageHandler}
                                                /> : null
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                    : null

            }


        </>
    )
}

export default Chatt
