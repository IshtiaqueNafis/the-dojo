import React from 'react';
import "./SideBar.css"
import DashboardIcon from "../../assets/dashboard_icon.svg"
import  AddIcon from "../../assets/add_icon.svg"
import {NavLink} from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import {useSelector} from "react-redux";
const SideBar = () => {

    const {user,loading} = useSelector(state=>state.auth)




    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    {user &&    <Avatar src={user.profilePic} />}
                    {user &&    <p>hey {user.displayName}</p>}
                    {/* avatar & username here later */}

                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
