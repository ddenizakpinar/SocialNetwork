import React from 'react'

import classes from './Comment.module.css'
//href={"/"+props.item.ownerID}
const Comment = props => {
    return (
        <div className={classes.commentContainer}>
            <div className={classes.imgtext}>
                <a href={"/" + props.comment.userID._id}> <img className={classes.commentUserPicture} alt="" src={"http://asocial-network-api.herokuapp.com/image/"+props.comment.userID.imgUrl}></img>
                </a>
                <div className={classes.contentContainer}>
                    <div className={classes.commentContent}>
                        <div>
                            <a href={"/" + props.comment.userID._id}>
                                <span className={classes.commentOwnerText}>{props.comment.userID.name} </span>
                            </a>
                            {props.comment.content}
                        </div>

                        <div className={classes.bottomSection}>
                            <span style={{ marginRight: "4px", fontWeight: "500" }}>0 Likes </span>
                            {props.calculateTime(props.comment.date)}

                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.right}>

                <i className="far fa-heart"></i>

            </div>
        </div>
    )
}

export default Comment
