import React from 'react'
import moment from 'moment'

import classes from './ProfileInfo.module.css'

const ProfileInfo = props => {
    
    return (
        <div className={classes.cardSize}>
            <img src={"http://asocial-network-api.herokuapp.com/image/"+props.profileUser.bgUrl} className={classes.bgImg} alt=""></img>
            <img src={"http://asocial-network-api.herokuapp.com/image/"+props.profileUser.imgUrl} className={classes.profileImg} alt=""></img>
            <div className={classes.info}>
                <div className={classes.innerInfo}>
                    <div>
                        <div className={classes.nameText}>{props.profileUser.name}</div>
                        <div className={classes.dateText}>{moment(props.profileUser.date).fromNow()}</div>
                    </div>

                    <div className={classes.friendSection}>
                        <div className={classes.friends}>
                            {props.profileUser.friends.length} Friends
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
