import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ConnectParametr } from "../../models/connect-param";
import { notification } from 'antd'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow, MenuItem
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Box from '@mui/material/Box';


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: #fff;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    width: 100%;
    padding: 10px 12px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;
  
    &:hover {
      background-color: ${grey[400]};
    }
  
    &:focus {
      color: #fff;
      outline: 3px solid ${grey[200]};
    }
  
    &.${tabUnstyledClasses.selected} {
      background-color: #fff;
      color: ${grey[600]};
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

const TabPanel = styled(TabPanelUnstyled)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    border-radius: 12px;
    opacity: 1.0;
    `,
);

const TabsList = styled(TabsListUnstyled)(
    ({ theme }) => `
    min-width: 400px;
    background-color: ${grey[500]};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);


const ProjectConnecter = (props: any) => {
    // const connect_parameters = props.connect_parameters
    const perPage = 10;
    const [page, setPage] = useState(0);
    const [connect_parameters, setConnectParam] = useState<ConnectParametr[]>([]);
    const [cnct_name, setCnctName] = useState('');
    const [cnct_path, setCnctPath] = useState('');
    const [cnct_type, setCnctType] = useState('');
    const [cnct_comment, setCnctComment] = useState('');
    const {connect_parameters1} = props;

    useEffect(() => {
        if (connect_parameters1 != null){
            setConnectParam(connect_parameters1);
        }
        
    }, [connect_parameters])
    // const handleConnectParamAdd = (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     setConnectParam([
    //         ...connect_parameters,
    //         {
    //             name: cnct_name,
    //             path: cnct_path,
    //             type: cnct_type,
    //             comment:cnct_comment
    //         }
    //     ]);
    //     setCnctName('');
    //     setCnctPath('');
    //     setCnctType('');
    //     setCnctComment('');
    // }      
    const del = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`/v1/connect/${id}`);
            setConnectParam(connect_parameters.filter(p => p.id !== id));
        }
    }
    return (

        <TableBody>
            
            {connect_parameters.slice(page * perPage, (page + 1) * perPage).map(item => {
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell><TextField variant="standard"
                        value={item.name} onChange={e => setCnctName(e.target.value)} //rows={2}
                    /></TableCell>
                    <TableCell>
                        <TextField variant="standard"
                            value={item.path} onChange={e => setCnctPath(e.target.value)} //rows={3}
                        /></TableCell>
                    <TableCell>
                        <TextField variant="standard"
                            value={item.type} onChange={e => setCnctType(e.target.value)} //rows={4}
                        /></TableCell>
                    <TableCell>
                        <TextField variant="standard"
                             value={item.comment}
                            onChange={e => setCnctType(e.target.value)}
                        /></TableCell>
                    <ToggleButtonGroup>
                        <Button variant="contained" color="primary"
                            href={`/connect/${item.id}/edit`}
                        
                        >Edit</Button>
                        <Button variant="contained" color="secondary"
                        onClick={() => del(item.id)}
                        >Delete</Button>
                    </ToggleButtonGroup>
                </TableRow>
            })}

        </TableBody>
        
    );
};
export default ProjectConnecter;