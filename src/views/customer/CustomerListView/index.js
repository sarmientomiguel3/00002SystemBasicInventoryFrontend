import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import Axios from 'axios';
//import ItemDialog from 'ItemDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();

  const [customers, setCustomers] = useState([]);

  const [error, setError] = useState(null);

  //const handleClickOpen = () => {
    //setOpen(true);
  //};

  useEffect(() => {

    Axios.post('http://localhost:3001/api/item/selectionall').then(response => {
      setCustomers(response.data);
    }).catch(err => {
      if (err.response.status === 401) 
        setError(err.response.data.message);
      else setError("no se por que se produjo el error");
    });
  });


  //<Button variant="outlined" color="primary" onClick={handleClickOpen}>
    //Open form dialog
  //</Button>
  
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar customers={customers}/>
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
