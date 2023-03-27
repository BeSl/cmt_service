import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {RedirectToUsers} from "./components/RedirectToUsers";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import UserProps from "./pages/UserProps";
import Projects from './pages/projects/Projects';
import EvLoggs from './pages/LoggerList';
import CommitsList from './pages/CommitsList';
import ProjectForm from './pages/projects/ProjectForm';
import ConnectForm from './pages/projects/ConnectForm';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path={'/'} exact component={RedirectToUsers}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/profile'} component={Profile}/>
                
                <Route path={'/users'} exact component={Users}/>
                <Route path={'/users/:id'} component={UserProps}/>
                
                <Route path={'/projects'} exact component={Projects}/>
                <Route path={'/projects/:id'} component={ProjectForm}/>
                <Route path={'/connect/:id'} component={ConnectForm}/>
                
                <Route path={'/errors'} exact component={EvLoggs}/>
                <Route path={'/commits'} exact component={CommitsList}/>
                
                
            </BrowserRouter>
        </div>
    );
}

export default App;
