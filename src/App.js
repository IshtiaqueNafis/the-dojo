import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateProject from "./pages/createProject/CreateProject";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./Components/Navbar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {projectAuth} from "./firebase/config";
import {setUserDetailsAsync} from "./Redux/Reducers/AuthSliceReducer";

const App = () => {

    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch()


    useEffect(() => {

        const unSub = projectAuth.onAuthStateChanged(logged => {
            if (logged) {

                dispatch(setUserDetailsAsync({id: logged.uid}));
            }
            unSub()
        });

    }, [dispatch])


    return (


        <div className="App">
            <BrowserRouter>
                {user && <SideBar/>
                }
                <div className="container">
                    <NavBar/>
                    <Switch>
                        <Route exact path={'/'}>
                            {!user && <Redirect to={"/login"}/>}
                            {user && <Dashboard/>}
                        </Route>
                        <Route path={'/create'}>
                            {!user && <Redirect to={"/login"}/>}
                            {user && <CreateProject/>}
                        </Route>
                        <Route path={'/projects/:id'}>
                            {!user && <Redirect to={"/login"}/>}
                            {user && <Project/>}
                        </Route>
                        <Route path={'/login'}>
                            {user && <Redirect to={"/"}/>}
                            {!user && <Login/>}
                        </Route>
                        <Route path={'/signup'}>
                            {user && <Redirect to={"/"}/>}
                            {!user && <SignUp/>}
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App
