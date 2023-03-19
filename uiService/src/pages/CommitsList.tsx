import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {Commit} from "../models/commit";
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

const CommitList = () => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/v1/queue');

                setCommits(data);
            }
        )()
    }, []);

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Дата загрузки</TableCell>
                        <TableCell>Ветка</TableCell>
                        <TableCell>Автор</TableCell>
                        <TableCell>Обработка</TableCell>
                        <TableCell>Текст коммита</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {commits.slice(page * perPage, (page + 1) * perPage).map(commit => {
                        return (
                            <TableRow>
                                <TableCell>{commit.date}</TableCell>
                                <TableCell>{commit.branch}</TableCell>
                                <TableCell>{commit.author}</TableCell>
                                <TableCell>{commit.nameData}</TableCell>
                                <TableCell>{commit.text_commit}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={commits.length}
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

export default CommitList;
