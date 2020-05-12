import React from 'react'
import moment from 'moment'
import classes from './PostItem.module.css'
import Comment from './Comment/Comment'

const PostItem = props => {

    
    const calculateTime = (date) => {
        return moment(date).fromNow();
    }

    const addCommentHandler = () => {
        props.onAddComment(props.post._id, document.getElementById(props.post._id).value)
        document.getElementById(props.post._id).value = ""
    }

    return (
        <div className={classes.postContainer}>
            <div className={classes.userInfo}>
                <a href={"/" + props.post.userID._id} alt="">  <img className={classes.userPicture} alt="" src={"http://asocial-network-api.herokuapp.com/image/" + props.post.userID.imgUrl}></img>
                </a>
                <div className={classes.userTextContainer}>
                    <a href={"/" + props.post.userID._id} alt="">
                        <div className={classes.userName}>
                            {props.post.userID.name}
                        </div>
                    </a>
                    <div className={classes.postDate}>
                        {calculateTime(props.post.date)}
                    </div>
                </div>
            </div>
            <div className={classes.contentContainer}>
                {props.post.content}
            </div>
            {
                props.post.type === 1 ?
                    <div>
                        <img className={classes.postImg} alt="" src={"http://asocial-network-api.herokuapp.com/image/" + props.post.mediaURL}></img>
                    </div> : null
            }
            <div className={classes.contentInfo}>
                <div>
                    <span style={{ fontWeight: "500" }}>{props.post.likes.length} Likes</span>
                </div>
                <div className={classes.contentCommentInfo}>
                    <div style={{ marginRight: "5px" }}>
                        <span>{props.post.comments.length} comments</span>
                    </div>
                    <div>
                        <span>0 shares</span>
                    </div>
                </div>
            </div>
            <div className={classes.buttonsContainer}>

                {
                    props.userInfo.data ?
                        <button
                            onClick={() => props.onLike(props.post._id)}
                            className={classes.submitButton}
                            type="submit">
                            {

                                props.post.likes.includes(props.userInfo.data.result._id) ?
                                    <div ><i style={{ color: "#B80C09" }} className="fas fa-heart"></i> Liked</div> :
                                    <div><i className="far fa-heart"></i> Like</div>
                            }
                        </button>
                        : null
                }
                <button
                    className={classes.submitButton}
                    type="submit">
                    <i className="far fa-comment-alt"></i> Comment
                </button>
                <button
                    className={classes.submitButton}
                    type="submit">
                    <i className="far fa-share-square"></i> Share
                </button>
            </div>
            <div className={classes.commentsContainer}>

                {
                    props.post.comments ?
                        props.post.comments.map((item, index) => {
                            return (
                                <Comment key={index} comment={item} calculateTime={calculateTime}></Comment>
                            )
                        })
                        : null
                }
            </div>

            <div className={classes.inputContainer}>
                <textarea id={props.post._id} className={classes.commentInput} placeholder="Add a comment..." rows="1"></textarea>
                <button
                    onClick={() => { addCommentHandler() }}
                    className={classes.sendButton}
                    type="submit">
                    <i className="fas fa-share"></i>
                </button>
            </div>
        </div>
    )
}

export default PostItem
