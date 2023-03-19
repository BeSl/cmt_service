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


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path={'/'} exact component={RedirectToUsers}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/profile'} component={Profile}/>
                <Route path={'/users'} exact component={Users}/>
                {/* <Route path={'/users/:id/links'} component={Links}/> */}
                <Route path={'/users/:id'} component={UserProps}/>
                <Route path={'/projects/:id/edit'} component={ProjectForm}/>
                <Route path={'/projects'} exact component={Projects}/>
                <Route path={'/errors'} component={EvLoggs}/>
                 {/*<Route path={'/products/:id/edit'} component={ProductForm}/> */}
                <Route path={'/commits'} exact component={CommitsList}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
