import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BuildIcon from '@material-ui/icons/Build';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Axios from 'axios';
import { useTableSearch } from './useTableSearch';

import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [openview, setOpenview] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const [opendeleted, setOpendeleted] = useState(false);

  const [element, setElement] = useState([]);

  const [searchVal, setSearchVal] = useState(null);
  
  const [pageinit, setPageinit] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenView = (localElement) => {
    console.log(localElement);
    setElement(localElement);
    setOpenview(true);
  };

  const handleCloseView = () => {
    setOpenview(false);
  };

  const handleClickOpenEdit = (localElement) => {
    console.log(localElement);
    setElement(localElement);
    setOpenedit(true);
  };

  const handleCloseEdit = () => {
    setOpenedit(false);
  };

  const handleClickOpenDeleted = (localElement) => {
    setElement(localElement);
    setOpendeleted(true);
  };

  const handleCloseDeleted = () => {
    setOpendeleted(false);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setPageinit(+newPage*limit);
  };


  const handleChange = (event) => {
    setElement({
      ...element,
      [event.target.name]: event.target.value
    });
  };

  const handleEditUpload = (localElement) => {
    Axios.post('http://localhost:3001/api/item/update', localElement)
      .then(response => {
        console.log(response.message);
      })
      .catch(error => {
        console.log(error.message);
      });
    setOpenedit(false);
  };

  const handleDeleted = (localElement) => {
    Axios.post('http://localhost:3001/api/item/deleted', localElement)
      .then(response => {
        console.log(response.message);
      })
      .catch(error => {
        console.log(error.message);
      });
    setOpendeleted(false);
  };

  const columns = ["Id", "Codigo de Item", "Nombre", "Marca", "Modelo", "Tipo", "Color", "Serie", "Estado", "Actualizado"];

  const options = {
    filterType: 'dropdown',
  };

  const data = customers.map((t) => (Object.keys(t).map(n => t[n]) ));

  return (
    <div>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <MUIDataTable 
          title={"Lista de Objetos"}
          data={data}
          columns={columns}
          options={options}
        />
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
