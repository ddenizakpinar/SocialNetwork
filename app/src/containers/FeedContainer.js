import React, { useState, useEffect, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { connect } from 'react-redux'
import * as postActions from '../store/actions/postActions'
import * as userActions from '../store/actions/userActions'
import Feed from '../components/Feed/Feed'

const FeedContainer = props => {

    const onProfile = () => {
        props.onFetchProfileFeed(props.id, pageNumber);
        props.getProfileUserInfo(props.id);
    }

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        props.id ? onProfile() : props.onFetchFeed(pageNumber);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    const [content, setContent] = useState("");
    const [type, setType] = useState(1);
    const [file, setFile] = useState('');

    const createPostHandler = () => {
        let type;
        type = file !== '' ? 1 : 0;
        props.onCreatePost(content, type, file);
        setContent("");
        setFile('');
    }


    const handleOnDocumentBottom = useCallback(() => {
        setPageNumber(curr => curr + 1)

    }, [])
    useBottomScrollListener(handleOnDocumentBottom, 400)

    return (
        <>
            <Feed
                profileUser={props.user.profileUser}
                id={props.id}
                content={content}
                setContent={setContent}
                type={type}
                setType={setType}
                onCreatePost={createPostHandler}
                onFetchFeed={props.onFetchFeed}
                posts={props.post.feed}
                onAddComment={props.onAddComment}
                onLike={props.onLike}
                userInfo={props.user.userInfo}
                setFile={setFile}
                file={file}

            />
        </>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        onCreatePost: (content, type, mediaURL, file) => dispatch(postActions.createPost(content, type, mediaURL, file)),
        onFetchFeed: (page) => dispatch(postActions.fetchMoreFeed(page)),
        onFetchProfileFeed: (id, page) => dispatch(postActions.fetchMoreProfileFeed(id, page)),
        onAddComment: (postID, content) => dispatch(postActions.addComment(postID, content)),
        onLike: (postID) => dispatch(postActions.like(postID)),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)

