import React from 'react'

import classes from './Card.module.css'

const Card = props => {
    return (
        <div className={classes.cardContainer} style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            <div className={classes.innerContainer}>

                <div className={classes.imgContainer}>
                    <a href={"/" + props.id}>
                        <img className={classes.img} src={"http://asocial-network-api.herokuapp.com/image/" + props.image} alt=""></img>
                    </a>
                </div>
                <div className={classes.textContainer}>
                    <a href={"/" + props.id}>
                        <div className={classes.mainText}>
                            {props.text}
                        </div>
                    </a>
                    <div className={classes.subText}>
                        {props.subtext}
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

export default Card
