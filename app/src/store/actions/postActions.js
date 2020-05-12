import axios from 'axios'
import { FETCH_MORE_FEED, SET_SINGLE_POST, SET_UPDATED_POST } from './actionTypes'
import Compressor from 'compressorjs';

// Creates new post 
export const createPost = (content, type, file) => {
    return dispatch => {
        // Type 1 means post has a image with it
        // Decrease its size and uploads it to the server as multipart form data
        if (type === 1) {
            new Compressor(file, {
                convertSize: 500000, 
                quality: 0.6,
                success(result) {
                    const formData = new FormData();
                    // The third parameter is required for server
                    formData.append('file', result, result.name);
                    // Send the compressed image file to server with XMLHttpRequest.
                    axios.post('http://asocial-network-api.herokuapp.com/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        axios.post('http://asocial-network-api.herokuapp.com/api/posts', {
                            content: content,
                            type: type,
                            mediaURL: res.data.file.filename
                        },
                        ).then(res => {
                            dispatch(getSinglePost(res.data.postID))
                        }).catch(err => { console.log(err) })
                    }).catch(err => {
                        console.log(err)
                    })
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
        // Makes post request to the server
        else if (type === 0) {
            axios.post('http://asocial-network-api.herokuapp.com/api/posts', {
                content: content,
                type: type,
            },
            ).then(res => {
                dispatch(getSinglePost(res.data.postID))
            }).catch(err => { console.log(err) })
        }


    }




}

// Fetches feed for desired page number
export const fetchMoreFeed = (page) => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/posts/' + page, {
        })
            .then(res => {
                //console.log(res)
                dispatch(setFetchMoreFeed(res))
            })
            .catch(err => { console.log(err) })
    }
}

// Fetches feed for desired user 
export const fetchMoreProfileFeed = (id, page) => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/posts/profile/' + id + "/" + page, {
        })
            .then(res => {
                //console.log(res)
                dispatch(setFetchMoreFeed(res))
            })
            .catch(err => { console.log(err) })
    }
}


export const setFetchMoreFeed = (data) => {
    return {
        type: FETCH_MORE_FEED,
        payload: data
    }
}

// Fetches a post by post id ( Used for updates )
export const getSinglePost = (postID) => { 
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/posts/post/' + postID, {

        }).then(res => {
            dispatch(setSinglePost(res))
        })
    }
}

export const setSinglePost = (post) => { // SENKRON > REDUCER
    return {
        type: SET_SINGLE_POST,
        payload: post
    }
}

// Adds a new comment to a post by postID and content
export const addComment = (postID, content) => {
    return dispatch => {
        axios.post('http://asocial-network-api.herokuapp.com/api/comments/create/' + postID, {
            "content": content
        }).then(res => {
            dispatch(updatePost(postID))
        }).catch(err => {
            console.log(err)
        })
    }
}

// Like (and Unlike) a post by PostID
export const like = (postID) => {
    return dispatch => {
        axios.post('http://asocial-network-api.herokuapp.com/api/posts/like/' + postID, {
        }).then(res => {
            dispatch(updatePost(postID))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const updatePost = (postID) => {
    return dispatch => {
        axios.get('http://asocial-network-api.herokuapp.com/api/posts/post/' + postID, {
        }).then(res => {
            dispatch(setUpdatedPost(res))
        })
    }
}

export const setUpdatedPost = (data) => {
    return {
        type: SET_UPDATED_POST,
        payload: data
    }
}


