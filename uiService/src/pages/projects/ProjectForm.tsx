import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Project } from "../../models/project";
import { ConnectParametr } from "../../models/connect-param";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
// id: number;
// name: string;
// description: string;
// is_archive: boolean;
// platform: string;
// connect_parameters: ConnectParametr[];
const ProjectForm = (props: any) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [platform, setPlatform] = useState('');
    const [connect_parameters, setConnectParam] = useState<ConnectParametr[]>([]);
    const [redirect, setRedirect] = useState(false);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        if (props.match.params.id) {
            (
                async () => {
                    const { data } = await axios.get(`v1/projects/${props.match.params.id}`);

                    setName(data.name);
                    setDescription(data.description);
                    setPlatform(data.platform);
                    setConnectParam(data.connect_parameters);
                }
            )();
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            name,
            description,
            platform
        };

        if (props.match.params.id) {
            await axios.put(`v1/projects/${props.match.params.id}`, data);
        } else {
            await axios.post('v1/projects', data);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/projects'} />;
    }

    return (
        <Layout>
            <div className="py-5 text-center">
                <h2>{name}</h2>
                <p className="lead">Здесь можно отредактировать ключевые характеристики проекта {name} (id:{props.match.params.id})</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <div className="col-sm-6">
                        <TextField label="Название проекта" variant="outlined"
                            value={name} onChange={e => setName(e.target.value)}
                            style={{ height: "30px", width: "300px", marginBottom: "15px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField label="Платформа" variant="outlined"
                            value={platform} onChange={e => setPlatform(e.target.value)}
                            style={{ height: "30px", width: "150px", marginTop: "30px", marginBottom: "45px" }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <TextField label="Описание" variant="outlined"
                        value={description} onChange={e => setDescription(e.target.value)} multiline rows={4}
                    // style={{height: "30px", width: "350px", marginTop: "30px" , marginBottom: "15px"}}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Save</Button>
            </form>

            <div className="py-5 text-center">
                <p className="lead">Настроенное окружение проекта</p>
            </div>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'/connect/new'} variant="contained" color="primary">Add</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Путь</TableCell>
                        <TableCell>Тип</TableCell>
                        <TableCell>Комментарий</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {connect_parameters.slice(page * perPage, (page + 1) * perPage).map(item => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.path}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.comment}</TableCell>
                                <ToggleButtonGroup>
                                    <Button variant="contained" color="primary"
                                        href={`/projects/${item.id}/edit`}
                                        style={{ height: "30px", width: "60px" }}
                                    >Edit</Button>
                                    <Button variant="contained" color="secondary"
                                        //onClick={() => del(item.id)}  
                                        style={{ height: "30px", width: "60px" }}
                                    >Delete</Button>
                                </ToggleButtonGroup> 
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={connect_parameters.length}
                        page={page}
                        onChangePage={(e, newPage) => setPage(newPage)}
                        rowsPerPage={perPage}
                        rowsPerPageOptions={[]}
                    />
                </TableFooter>
            </Table>
        </Layout>
    );
};

export default ProjectForm;
