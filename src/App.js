import './App.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateProject from "./pages/createProject/CreateProject";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./Components/Navbar/NavBar";
import SideBar from "./Components/SideBar/SideBar";

const App = () => (
    <div className="App">
        <BrowserRouter>
            <SideBar/>
            <div className="container">
                <NavBar/>
                <Switch>
                    <Route exact path={'/'}>
                        <Dashboard/>
                    </Route>
                    <Route path={'/create'}>
                        <CreateProject/>
                    </Route>
                    <Route path={'/projects/:id'}>
                        <Project/>
                    </Route>
                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                    <Route path={'/signup'}>
                        <SignUp/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
);

export default App
