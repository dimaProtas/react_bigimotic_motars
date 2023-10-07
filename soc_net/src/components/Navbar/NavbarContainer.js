import React from "react";
import { connect } from "react-redux";
// import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import Nav from './Navbar.jsx';
import {selectFriends} from "../../reducer/users-reduser.js";
import {getTotalFriendsCount, getFriends} from "../../reducer/users-selectors.js"


class NavContainer extends React.Component {

    render() {
        return (
            <Nav totalFriendsCount={this.props.totalFriendsCount} friends={this.props.friends} />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        totalFriendsCount: getTotalFriendsCount(state),
        friends: getFriends(state),
        isAuth: state.auth.isAuth,
    }
}


export default compose (
    connect(mapStateToProps, 
        {
            selectFriends: selectFriends,
        })
) (NavContainer)