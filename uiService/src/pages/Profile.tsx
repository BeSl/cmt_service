import {Button, TextField} from '@material-ui/core';
import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";
import Grid from '@mui/material/Grid';
const Profile = (props: any) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [extId, setextId] = useState('');
    const [login1c, setLogin1c] = useState('');

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
        setextId(props.user.extId);
        setLogin1c(props.user.login1c);
    }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data} = await axios.put('users/info', {
            first_name,
            last_name,
            email,
            extId,
            login1c
        });

        props.setUser(data);
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/password', {
            password,
            password_confirm
        })
    }

    return (
        <Layout>
            <h3>Текущий пользователь</h3>
            <form onSubmit={infoSubmit}>
            <Grid container spacing={2} style={{ marginBottom: "15px" }}>
                        <Grid item  xs={3}>
                            <TextField label="First Name" fullWidth
                                value={first_name} onChange={e => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Last Name" fullWidth
                                value={last_name} onChange={e => setLastName(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: "15px" }}>
                        <Grid item  xs={3} >
                            <TextField label="Email" fullWidth
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <TextField label="авторизация в 1с" fullWidth
                                value={login1c} onChange={e => setLogin1c(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={1} style={{ marginBottom: "15px"}} >
                        <Grid item xs={3} >
                        <TextField label="uuid пользователя" fullWidth
                            value={extId} onChange={e => setextId(e.target.value)}
                        />
                        </Grid>
                    </Grid>                    
                <Button variant="contained" color="primary" type="submit">Обновить данные</Button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <TextField label="Password" type="password"
                               onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField label="Password Confirm" type="password"
                               onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Layout>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Profile);
