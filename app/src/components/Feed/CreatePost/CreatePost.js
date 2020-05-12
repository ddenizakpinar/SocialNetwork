import React from 'react'

import classes from './CreatePost.module.css'

const CreatePost = props => {
    return (
        <div className={classes.createPostContainer}>
            <div className={classes.title}>
                Create post
            </div>
            <div className={classes.text}>
                <div>
                    <img className={classes.userPicture} alt="" src={"http://asocial-network-api.herokuapp.com/image/"+props.userInfo?.data?.result?.imgUrl}></img>
                </div>
                <textarea
                    className={classes.textArea}
                    placeholder="What's on your mind?"
                    rows="6"
                    value={props.content}
                    onChange={(e) => props.setContent(e.target.value)}
                />
                <div className={classes.mediaIconsContainer}>
                    <div>
                        <label htmlFor="file-input">
                            <i className={["fas fa-image", classes.mediaIcons].join(' ')} />
                        </label>
                        <input id="file-input" type='file' onChange={(e) => props.setFile(e.target.files[0])} />
                    </div>
                </div>
            </div>
            {
                props.file ?
                    <img className={classes.previewImage} src={URL.createObjectURL(props.file)} alt=""></img> : null
            }
    
            <div className={classes.buttonsContainer}>
                <button
                    onClick={props.onCreatePost}
                    className={classes.submitButton}
                    type="submit">
                    <i className="fas fa-share-alt"></i> Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
