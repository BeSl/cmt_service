import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {User} from "../models/user";
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

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/admin/users');
                if (data!= null){
                    setUsers(data);
                }
            }
        )()
    }, []);

    return (
        <Layout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'/users/new'} variant="contained" color="primary">New User</Button>
            </div>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email(GIT)</TableCell>
                        <TableCell>login 1c</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.slice(page * perPage, (page + 1) * perPage).map(user => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.first_name} {user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.login1c}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                            href={`users/${user.id}/info`}
                                    >View</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={users.length}
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

export default Users;
