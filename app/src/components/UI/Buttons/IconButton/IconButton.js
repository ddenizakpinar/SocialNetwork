import React from 'react'

import classes from './IconButton.module.css'

const IconButton = props => {
    return (
        <button onClick={props.onClick} className={classes.button}>
            <i className={props.iconType}></i>
        </button>
    )
}

export default IconButton
