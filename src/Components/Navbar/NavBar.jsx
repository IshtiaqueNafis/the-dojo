import React from 'react';
import "./NavBar.css";
import Temple from "../../assets/temple.svg"
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={'navbar'}>
            <ul>
                <li className="logo">
                    <img src={Temple} alt="dojo logo"/>
                </li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>SignUp</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
