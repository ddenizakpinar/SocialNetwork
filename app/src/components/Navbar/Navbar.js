import React from 'react'
import { useWindowSize } from '@react-hook/window-size'
import classes from './Navbar.module.css'
import Search from './Search/Search'
import UserInfo from './UserInfo/UserInfo'

const Navbar = props => {
    const { showFriends, showNotifications } = props;
    const activeNotifications = showNotifications ? classes.active : null;
    const activeFriends = showFriends ? classes.active : null;
    const size = useWindowSize();
    return (
        <>
            <div className={classes.container}>
                <nav className={classes.navbar}>
                    <div className={classes.logo}>
                        <div className={classes.logoContainer}>
                            <a href="/" alt="" className={classes.text}>
                                <div className={classes.social}>Social</div>
                                <div className={classes.network}>Network</div>
                            </a>
                        </div>
                    </div>

                    <div className={classes.search}>
                        <Search
                            userInfo={props.userInfo}
                            toggleSearch={props.toggleSearch}
                            searchInput={props.searchInput}
                            setSearchInput={props.setSearchInput}
                            onSearch={props.onSearch}
                            searchResult={props.searchResult}
                            searchInputHandler={props.searchInputHandler}
                            onSendFriendRequest={props.onSendFriendRequest}
                        />
                    </div>


                    <div className={classes.profile}>
                        <UserInfo
                            userInfo={props.userInfo}
                            onLogout={props.onLogout}
                            showSettings={props.showSettings}
                            toggleSettings={props.toggleSettings}
                            showFriends={props.showFriends}
                            toggleFriends={props.toggleFriends}
                            showNotifications={props.showNotifications}
                            toggleNotifications={props.toggleNotifications}
                            friendRequestsList={props.friendRequestsList}
                            notificationsList={props.notificationsList}
                            onRemoveFriendRequest={props.onRemoveFriendRequest}
                            onAcceptFriendRequest={props.onAcceptFriendRequest}
                        />
                    </div>
                </nav>
            </div >
            {
                size[0] < 650 ?
                    <div className={classes.bottomContainer} >
                        <div className={classes.bottomIconButton} onClick={props.toggleSearch}>
                            <i className="fas fa-search"></i>
                        </div>
                        <div onClick={() => { props.setOpenChatOnMobile(curr => !curr) }} className={classes.bottomIconButton}>
                            <i className="fas fa-comments"></i>
                        </div>
                        <div className={classes.bottomIconButton} onClick={props.toggleFriends}>
                            <i className={["fas fa-user-friends", activeFriends].join(' ')}></i>
                            <div className={classes.bottomIconContainer}>
                                <p>{props.userInfo?.data?.result?.friendRequests?.length}</p>
                            </div>
                        </div>
                        <div className={classes.bottomIconButton} onClick={props.toggleNotifications}>
                            <i className={["fas fa-bell", activeNotifications].join(' ')}></i>
                            <div className={classes.bottomIconContainer} >
                                <p>{props.userInfo?.data?.result?.notifications?.length}</p>
                            </div>
                        </div>
                    </div> : null
            } </>
    )
}

export default Navbar
