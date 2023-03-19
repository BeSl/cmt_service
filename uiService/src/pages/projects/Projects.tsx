import React, {useEffect, useState} from 'react';
import {Project} from "../../models/project";
import axios from "axios";
import Layout from "../../components/Layout";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    Typography,
    TableHead,
    TableRow,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@material-ui/core";
import {ToggleButtonGroup} from "@material-ui/lab";

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/v1/projects');

                setProjects(data);
            }
        )();
    }, []);

    return (
        <Layout>
             <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'projects/create'} variant="contained" color="primary">Add</Button>
            </div> 
            {projects.map(project => {
                return (
                    <Accordion key={project.id}>
            <AccordionSummary>
                <Button  style={{height: "30px", width: "60px", marginRight: "20px"}} variant="contained" color="primary" href={`/projects/${project.id}/edit`}>Edit</Button>
                <Typography>     {project.platform} - <i>{project.name}</i> ({project.description})</Typography>
              </AccordionSummary>
                        <AccordionDetails>
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
                                    {project.connect_parameters.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.path}</TableCell>
                                                <TableCell>{item.type}</TableCell>
                                                <TableCell>{item.comment}</TableCell>
                                                <ToggleButtonGroup>
                                    </ToggleButtonGroup>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Layout>
    );
};

export default Projects;
