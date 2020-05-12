import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'
import FeedContainer from '../../containers/FeedContainer'
import classes from './HomeView.module.css'

//TODO: GROUPS
const Home = () => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                        <FeedContainer />
                  
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
