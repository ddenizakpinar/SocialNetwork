import React from 'react'

import classes from './Dropdown.module.css'

const Dropdown = props => {
    return (
        <div className={classes.DropdownActive}>
            <div className={classes.title}>
                {props.title}
            </div>
            {
                props.children
            }
        </div>
    )
}

export default Dropdown
