import React from 'react';
import "./NavBar.css";
import Temple from "../../assets/temple.svg"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOutUserAsync} from "../../Redux/Reducers/AuthSliceReducer";

const NavBar = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    return (
        <nav className={'navbar'}>
            <ul>
                <li className="logo">
                    <img src={Temple} alt="dojo logo"/>
                </li>
                {
                    !user &&
                    <>
                        <li><Link to={'/login'}>Login</Link></li>
                        <li><Link to={'/signup'}>SignUp</Link></li>
                    </>
                }


                <li>
                    {user && <button className={'btn'} onClick={() => dispatch(logOutUserAsync())}>LogOut</button>}

                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
