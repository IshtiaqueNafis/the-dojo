import React from 'react';
import "./OnlineUsers.css"
import {useDispatch, useSelector} from "react-redux";
import useFireStoreCollection from "../../Hooks/useFireStoreCollection";
import {listenToUsersFromFireStore} from "../../firebase/fireStore/fireStoreService";
import {retrieveAllUsersAsync} from "../../Redux/Reducers/AuthSliceReducer";
import Avatar from "../Avatar/Avatar";
import LoadingComponent from "../layout/LoadingComponent";

const OnlineUsers = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.auth)
    const {loading} = useSelector(state => state.async)
    useFireStoreCollection({
        query: () => listenToUsersFromFireStore(),
        data: users => dispatch(retrieveAllUsersAsync({users})),
        deps: [dispatch]
    })

    if (loading) return <LoadingComponent/>
    return (

        <div className={'user-list'}>
            <h2>All Users</h2>

            {users && users.map(user=>(
                <div key={user.id} className={'user-list-item'}>
                    <span>{user.displayName}</span>
                    <Avatar src={user.profilePic}/>

                </div>
            ))}


        </div>
    );
};

export default OnlineUsers;
