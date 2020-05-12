import React from 'react'

import classes from './ChatCard.module.css'

const ChatCard = props => {
   
    return (
        <div onClick={() => { props.onStartNewChat(props.id,props.name,props.image) }} className={classes.cardContainer} style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            <div className={classes.innerContainer}>
                <div className={classes.imgContainer}>
                    <a href={"/" + props.id}>
                        <img className={classes.img} src={"http://asocial-network-api.herokuapp.com/image/" + props.image} alt=""></img>
                    </a>
                </div>
                <div className={classes.textContainer}>
                    <a href={"/" + props.id}>
                        <div className={classes.mainText}>
                            {props.name}
                        </div>
                    </a>
                    <div className={classes.subText}>
                        
                    </div>
                </div>

            </div>
            <div className={classes.buttonContainer}>
                {
                    props.children
                }
            </div>
        </div>
    )
}

export default ChatCard
