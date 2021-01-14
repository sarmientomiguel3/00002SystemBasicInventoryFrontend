import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const Toolbar = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const codigo = useFormInput('');
  const nombre = useFormInput('');
  const marca = useFormInput('');
  const modelo = useFormInput('');
  const tipo = useFormInput('');
  const color = useFormInput('');
  const serie = useFormInput('');
  const estado = useFormInput('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const item = {
      codigo: codigo.value,
      nombre: nombre.value,
      marca: marca.value,
      modelo: modelo.value, 
      tipo: tipo.value, 
      color: color.value, 
      serie: serie.value, 
      estado: estado.value 
    };
    Axios.post('http://localhost:3001/api/item/add', item)
      .then(response => {

    codigo.value='';
    }).catch(error => {
    });

    codigo.value='';
    nombre.value='';
    marca.value='';
    modelo.value='';
    tipo.value=''; 
    color.value='';
    serie.value=''; 
    estado.value='';

    setOpen(false);
  };

  const [people, setPeople] = useState([
    { name: "Keanu Reeves", profession: "Actor" },
    { name: "Lionel Messi", profession: "Football Player" },
    { name: "Cristiano Ronaldo", profession: "Football Player" },
    { name: "Jack Nicklaus", profession: "Golf Player" },
  ]);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de Inventario";
    const headers = [["Id", "Codigo", "Nombre", "Marca", "Modelo", "Tipo", "Color", "Serie", "Estado", "Actualizado"]];

    const data = customers.map(elt=> [elt.id, elt.codigo, elt.nombre, elt.marca, elt.modelo, elt.tipo, elt.color, elt.serie, elt.estado, elt.updatedAt]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => exportPDF()}
        >
          Generar PDF
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                Añadir
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Añadir Items al Inventario, haga click a cada uno de los espacios.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="codigo"
            label="Codigo de Item"
            type="text"
            fullWidth
            {...codigo}
          />
          <TextField
            margin="dense"
            id="nombre"
            label="Nombre de Item"
            type="text"
            fullWidth
            {...nombre}
          />
          <TextField
            margin="dense"
            id="marca"
            label="Marca"
            type="text"
            fullWidth
            {...marca}
          />
          <TextField
            margin="dense"
            id="modelo"
            label="Modelo"
            type="text"
            fullWidth
            {...modelo}
          />
          <TextField
            margin="dense"
            id="tipo"
            label="Tipo"
            type="text"
            fullWidth
            {...tipo}
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            {...color}
          />
          <TextField
            margin="dense"
            id="serie"
            label="Serie"
            type="text"
            fullWidth
            {...serie}
          />
          <TextField
            margin="dense"
            id="estado"
            label="Estado"
            type="text"
            fullWidth
            {...estado}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
