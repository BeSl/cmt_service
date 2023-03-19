import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {Logger} from "../models/logger";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";

const EvLoggs = () => {
    const [logs, setLogs] = useState<Logger[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/v1/errors');

                setLogs(data);
            }
        )()
    }, []);

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Описание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.slice(page * perPage, (page + 1) * perPage).map(logon => {
                        return (
                            <TableRow key={logon.id}>
                                <TableCell>{logon.id}</TableCell>
                                <TableCell>{logon.date}</TableCell>
                                <TableCell>{logon.description}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={logs.length}
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

export default EvLoggs;
