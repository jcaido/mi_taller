import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import InventarioActualAlmacenPDF from './InventarioActualAlmacenPDF';
import InventarioFechaForm from './forms/InventarioFechaForm';
import { obtenerInventarioFecha } from '../../services/axiosService';
import useModal from '../../hooks/useModal';
import InventarioFechaPDF from './InventarioFechaPDF';

export default function InformesAlmacen() {
  const modal = useModal();
  const navigate = useNavigate();

  const [tablaInventarioActual, setTablaInventarioActual] = useState(false);
  const [formFechaInventario, setFormFechaInventario] = useState(false);
  const [tablaInventarioFecha, setTablaInventarioFecha] = useState(false);
  const [listaInventarioFecha, setListaInventarioFecha] = useState([]);
  const [fechaInventario, setFechaInventario] = useState();

  const handleClickInventarioActual = () => {
    setTablaInventarioActual(true);
    setFormFechaInventario(false);
    setTablaInventarioFecha(false);
  };

  const handleClickInventarioFecha = () => {
    setTablaInventarioActual(false);
    setFormFechaInventario(true);
    setTablaInventarioFecha(false);
  };

  const inventarioFecha = (fecha) => {
    obtenerInventarioFecha(fecha)
      .then((response) => {
        setTablaInventarioActual(false);
        setFormFechaInventario(false);
        setTablaInventarioFecha(true);
        setListaInventarioFecha(response.data);
        setFechaInventario(fecha);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          modal.handleOpenError('error en la fech');
        } else {
          modal.handleOpenError(`error: ${error}`);
        }
      });
  };

  const handleClickBotonRegresar = () => {
    navigate('/almacen/opciones');
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonInformes botonRegresar={handleClickBotonRegresar} />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box mt={2}>
          <Button variant="text" onClick={handleClickInventarioActual}>INVENTARIO ACTUAL DE PIEZAS EN ALMACEN</Button>
          <Button variant="text" onClick={handleClickInventarioFecha}>INVENTARIO DE PIEZAS EN ALMACEN (Fecha)</Button>
        </Box>
      </Grid>
      <Grid item md={9}>
        {tablaInventarioActual ? <InventarioActualAlmacenPDF /> : null}
        {formFechaInventario ? <InventarioFechaForm inventarioFecha={inventarioFecha} /> : null}
        {tablaInventarioFecha
          ? (
            <InventarioFechaPDF
              listaInventario={listaInventarioFecha}
              fechaInventario={fechaInventario}
            />
          ) : null}
      </Grid>
    </Grid>
  );
}
