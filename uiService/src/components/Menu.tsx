import { NavLink } from 'react-router-dom';
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';

const Menu = (props: any) => {
    const [is_admin, setAdmin] = useState('');
    useEffect(() => {
        setAdmin(props.user.is_admin);
    }, [props.user]);

    return (


        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    {is_admin &&  // Use ternary operator to conditionally render the li
                        <li className="nav-item">
                            
                            <NavLink  to={'/users'} className="nav-link" aria-current="page">
                            <PeopleAltOutlinedIcon />
                                Пользователи
                            </NavLink>
                        </li>
                    }
                    <li className="nav-item">
                        <NavLink to={'/projects'} className="nav-link" aria-current="page">
                            <LogoDevOutlinedIcon />
                            Проекты
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/errors'} className="nav-link" aria-current="page">
                            <PsychologyOutlinedIcon />
                            Логи
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/commits'} className="nav-link" aria-current="page">
                            <DynamicFormOutlinedIcon />
                            Очередь
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Menu);