import React from 'react'

import classes from './Search.module.css'
import Dropdown from '../../UI/Dropdown/Dropdown'
import Card from '../../UI/Card/Card'
import IconButton from '../../UI/Buttons/IconButton/IconButton'
import useWindowSize from '@react-hook/window-size'

const Search = props => {
    const size = useWindowSize();
    const active = size[0] > 650 ? classes.container : classes.bigContainer
    return (
        <>
            {
                <div className={active} >
                    <input
                        placeholder="Search people..."
                        className={classes.inputStyle}
                        value={props.searchInput}
                        onChange={e => { props.searchInputHandler(e) }}
                    />
                </div> 
            }
            {
                props.searchInput.length > 0 ?

                    <div className={classes.dropdownPosition}>
                        <Dropdown title="Search results">
                            {
                                props.searchResult.data ?
                                    props.searchResult.data.result.map(user => {
                                        return (
                                            <Card
                                                id={user._id}
                                                key={user._id}
                                                image={user.imgUrl}
                                                text={user.name}
                                                subtext="0 Mutual friends"
                                            >
                                                {
                                                    (user.friendRequests.filter(e => e === props.userInfo?.data?.result?._id).length === 0) &&
                                                        (props.userInfo?.data?.result?.friends.filter(e => e._id === user._id).length === 0) &&
                                                        (props.userInfo?.data?.result?._id !== user._id) ?
                                                        <div onClick={() => { props.onSendFriendRequest(user._id, props.searchInput) }}>
                                                            <IconButton iconType="fas fa-user-plus" />
                                                        </div> : <div></div>
                                                }
                                            </Card>
                                        )
                                    })
                                    : null
                            }
                            <div className={classes.seeAll}>See all results for {props.searchInput}</div>
                        </Dropdown>
                    </div>
                    : null
            }
        </>

    )
}

export default Search
