import React from "react";
// import Pagination from "../Common/Pogination/Pagination.jsx";
import ScrollUsers from "./ScrollUsers/ScrollUSersCompanent.jsx"
import User from "./User.jsx";

const Users = ({currentPage, onPageChenge, totalCountUsers, pageSize, follow, unfollow, followingInProgress, 
    users, profile, getUsers, setCurrentPage, getNextUsers, setShowScrollIcon, loadingNextUsers}) => {
    return (
        <div>
               
            <User follow={follow} unfollow={unfollow} followingInProgress={followingInProgress} users={users} />
            {/* <Pagination currentPage={currentPage} onPageChenge={onPageChenge} totalCountUsers={totalCountUsers} 
            pageSize={pageSize} getUsers={getUsers} setCurrentPage={setCurrentPage} /> */}
            <ScrollUsers getNextUsers={getNextUsers} />

        </div>
    )
}

export default Users