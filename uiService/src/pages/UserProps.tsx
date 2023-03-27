import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { notification } from 'antd'
import Grid from '@mui/material/Grid';
const UserProps = (props: any) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [extId, setextId] = useState('');
    const [login1c, setLogin1c] = useState('');

    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (props.match.params.id) {
            (
                async () => {
                    const { data } = await axios.get(`admin/users/${props.match.params.id}`);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setEmail(data.email);
                    setextId(data.extId);
                    setLogin1c(data.login1c);
                    setPassword(data.password);
                    setPasswordConfirm(data.password_confirm);
                }
            )();
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            first_name,
            last_name,
            email,
            extId,
            login1c
        };

        if (props.match.params.id) {
            await axios.put(`admin/users/${props.match.params.id}`, data);
        } else {
            await axios.post('admin/users/new', data);
        }
        // notification.success({
        //     message: 'Данные пользователя обновлены',
        // });
        setRedirect(true);
    }

    const newpassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            password,
            password_confirm
        };

        if (props.match.params.id) {
            await axios.post(`admin/users/${props.match.params.id}/password`, data);
        }
        notification.success({
            message: 'Пароль успешно изменён',
        });
        setRedirect(true);

    }
    if (redirect) {

        return <Redirect to={'/users'} />;
    }

    return (
        <Layout>
            <h3>Пользователь {first_name} {last_name}</h3>
            <form onSubmit={submit}>
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

            <h3 className="mt-4">Сменить пароль</h3>
            <form onSubmit={newpassword}>
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
                <Button variant="contained" color="primary" type="submit">Save</Button>
            </form>
        </Layout>
    );
};

export default UserProps;
