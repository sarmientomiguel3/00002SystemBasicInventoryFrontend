import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import BuildIcon from '@material-ui/icons/Build';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Axios from 'axios';

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

  return (
    <div>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Codigo de Item
                  </TableCell>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Marca
                  </TableCell>
                  <TableCell>
                    Modelo
                  </TableCell>
                  <TableCell>
                    Tipo
                  </TableCell>
                  <TableCell>
                    Color
                  </TableCell>
                  <TableCell>
                    Serie
                  </TableCell>
                  <TableCell>
                    Estado
                  </TableCell>
                  <TableCell>
                    Actualizado
                  </TableCell>
                  <TableCell>
                    Opciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(pageinit, pageinit+limit).map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell>
                      {customer.id}
                    </TableCell>
                    <TableCell>
                      {customer.codigo}
                    </TableCell>
                    <TableCell>
                      {customer.nombre}
                    </TableCell>
                    <TableCell>
                      {customer.marca}
                    </TableCell>
                    <TableCell>
                      {customer.modelo}
                    </TableCell>
                    <TableCell>
                      {customer.tipo}
                    </TableCell>
                    <TableCell>
                      {customer.color}
                    </TableCell>
                    <TableCell>
                      {customer.serie}
                    </TableCell>
                    <TableCell>
                      {customer.estado}
                    </TableCell>
                    <TableCell>
                      {customer.updatedAt}
                    </TableCell>
                    <TableCell>
                      <VisibilityIcon onClick={() => handleClickOpenView({
                        id : customer.id,
                        codigo: customer.codigo,
                        nombre: customer.nombre,
                        marca: customer.marca,
                        modelo: customer.modelo,
                        tipo: customer.tipo,
                        color: customer.color,
                        serie: customer.serie,
                        estado: customer.estado,
                        updatedAt: customer.updatedAt
                      })}/>
                      <BuildIcon onClick={() => handleClickOpenEdit({
                        id : customer.id,
                        codigo: customer.codigo,
                        nombre: customer.nombre,
                        marca: customer.marca,
                        modelo: customer.modelo,
                        tipo: customer.tipo,
                        color: customer.color,
                        serie: customer.serie,
                        estado: customer.estado,
                        updatedAt: customer.updatedAt
                      })}/>
                      <DeleteForeverOutlinedIcon onClick={() => handleClickOpenDeleted({
                        id : customer.id
                      })}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={customers.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openview} onClose={handleCloseView} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">View</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vista del item
          </DialogContentText>
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Codigo de Item"
            name="codigo"
            onChange={handleChange}
            required
            value={element.codigo}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Nombre"
            name="nombre"
            onChange={handleChange}
            required
            value={element.nombre}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Marca"
            name="marca"
            onChange={handleChange}
            required
            value={element.marca}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Modelo"
            name="modelo"
            onChange={handleChange}
            required
            value={element.modelo}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Tipo"
            name="tipo"
            onChange={handleChange}
            required
            value={element.tipo}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Color"
            name="color"
            onChange={handleChange}
            required
            value={element.color}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Serie"
            name="serie"
            onChange={handleChange}
            required
            value={element.serie}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Estado"
            name="estado"
            onChange={handleChange}
            required
            value={element.estado}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Actualizado"
            name="actualizado"
            onChange={handleChange}
            required
            value={element.updatedAt}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openedit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">EDIT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Editar elemento
          </DialogContentText>
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Codigo de Item"
            name="codigo"
            onChange={handleChange}
            required
            value={element.codigo}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Nombre"
            name="nombre"
            onChange={handleChange}
            required
            value={element.nombre}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Marca"
            name="marca"
            onChange={handleChange}
            required
            value={element.marca}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Modelo"
            name="modelo"
            onChange={handleChange}
            required
            value={element.modelo}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Tipo"
            name="tipo"
            onChange={handleChange}
            required
            value={element.tipo}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Color"
            name="color"
            onChange={handleChange}
            required
            value={element.color}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Serie"
            name="serie"
            onChange={handleChange}
            required
            value={element.serie}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Estado"
            name="estado"
            onChange={handleChange}
            required
            value={element.estado}
            variant="outlined"
          />
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="Actualizado"
            name="actualizado"
            onChange={handleChange}
            required
            value={element.updatedAt}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleEditUpload(element)} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={opendeleted} onClose={handleCloseDeleted} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deleted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Esta seguro que desea eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleted} color="primary">
            No
          </Button>
          <Button onClick={() => handleDeleted(element)} color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
