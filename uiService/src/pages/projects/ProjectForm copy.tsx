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


const ProjectForm = (props: any) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [platform, setPlatform] = useState('');
    const [connect_parameters, setConnectParam] = useState<ConnectParametr[]>([]);
    const [redirect, setRedirect] = useState(false);
    const [page, setPage] = useState(0);
    const perPage = 10;
    const [cnct_name, setCnctName]= useState('');
    const [cnct_path, setCnctPath]= useState('');
    const [cnct_type, setCnctType]= useState('');
    const [cnct_comment, setCnctComment]= useState('');

     const currencies = [
         {
             value: '1C',
             label: '1С Предприятие',
         },
         {
             value: 'Rabbit MQ',
             label: 'Rabbit MQ',
         },
         {
             value: 'Delphi',
             label: 'Орел',
         },
     ];
    
    // setRedirect(true); 

    useEffect(() => {
        if (props.match.params.id) {
              (
                  async () => {
                      const {data} = await axios.get(`v1/projects/${props.match.params.id}`);
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
              platform,
              connect_parameters
          };

          if (props.match.params.id) {
            if (props.match.params.id=='new'){
                await axios.post('v1/projects', data);
            }else{
              await axios.put(`v1/projects/${props.match.params.id}`, data);
            }
          }

        setRedirect(true);
    }

    if (redirect) {
        notification.success({
             message: 'Данные проекта обновлены',
        });
         return <Redirect to={'/projects'} />;
    }
     const del = async (id: number) => {
         if (window.confirm('Are you sure?')) {
             await axios.delete(`/v1/connect/${id}`);
             setConnectParam(connect_parameters.filter(p => p.id !== id));
         }
     }
     const handleClick = (conPar: ConnectParametr) => {
        setConnectParam([...connect_parameters, conPar]);
      };
    return (
        <Layout>
            <div className="py-5 text-center">
                <h2>{name}</h2>
                <h4 className="lead">Здесь можно отредактировать ключевые характеристики проекта {name} (id:{props.match.params.id})</h4>
            </div>
             <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab>Основная информация</Tab>
                    <Tab>окружение проекта</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <form onSubmit={submit}>
                            <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" style={{ marginBottom: "15px" }}>
                            <Box gridColumn="span 2" style={{ marginBottom: "15px" }}>
                            <TextField label="Название" variant="outlined" fullWidth
                                value={name} onChange={e => setName(e.target.value)}/>
                            </Box>
                            <Box gridColumn="span 1" style={{ marginLeft: "15px" }}>
                            <TextField label="Платформа" variant="outlined" fullWidth
                                value={platform} onChange={e => setPlatform(e.target.value)}
                                select >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </Box>
                            <Box gridColumn="span 6">
                            <TextField label="Описание" variant="outlined" fullWidth
                            value={description} onChange={e => setDescription(e.target.value)} multiline rows={4}
                        />
                            </Box>
                            <Box gridColumn="span 8">
                            </Box>
                        </Box>
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                </form>

            </TabPanel>
            <TabPanel value={1}>
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <Button variant="contained" color="primary" onClick={() => handleClick({id:connect_parameters.length + 1,name:'sss',comment:'',path:'',type:''})}>Add</Button>
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
                                    <TableCell><TextField  variant="standard"
                                    value={item.name} onChange={e => setCnctName(e.target.value)} //rows={2}
                                    /></TableCell>
                                     <TableCell>
                                        <TextField  variant="standard"
                                    value={item.path} onChange={e => setCnctPath(e.target.value)} //rows={3}
                                    /></TableCell>
                                    <TableCell>
                                        <TextField  variant="standard"
                                    value={item.type} onChange={e => setCnctType(e.target.value)} //rows={4}
                                    /></TableCell>
                                    <TableCell>
                                        <TextField  variant="standard"
                                    // value={item.comment}
                                     onChange={e => setCnctType(e.target.value)} value={cnct_type}
                                    /></TableCell>
                                    <ToggleButtonGroup>
                                        <Button variant="contained" color="primary"
                                            href={`/connect/${item.id}/edit`}
                                            // style={{ height: "30px", width: "60px" }}
                                        >Edit</Button>
                                        <Button variant="contained" color="secondary"
                                            //onClick={() => del(item.id)}
                                            // style={{ height: "30px", width: "60px" }}
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


            </TabPanel>
        </TabsUnstyled> 
        </Layout >
    );
};

export default ProjectForm;
