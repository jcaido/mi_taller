import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import InventarioActualPDF from './InventarioActualPDF';
import InventarioFechaForm from './forms/InventarioFechaForm';
import { obtenerInventarioFecha, obtenerMovimientosPieza } from '../../services/axiosService';
import useModal from '../../hooks/useModal';
import InventarioFechaPDF from './InventarioFechaPDF';
import ModalErrores from '../../utils/ModalErrores';
import BuscarPiezaPorReferenciaForm from '../piezas/forms/BuscarPiezaPorReferenciaForm';
import MovimientosPiezaPDF from './MovimientosPiezaPDF';

export default function InformesAlmacen() {
  const modal = useModal();
  const navigate = useNavigate();

  const [formFechaInventario, setFormFechaInventario] = useState(false);
  const [tablaInventarioFecha, setTablaInventarioFecha] = useState(false);
  const [listaInventarioFecha, setListaInventarioFecha] = useState([]);
  const [fechaInventario, setFechaInventario] = useState();
  const [formSeleccionarPieza, setFormSeleccionarPieza] = useState(false);
  const [pdfInventario, setPdfInventario] = useState(false);
  const [pdfMovimientosPieza, setPdfMovimientosPieza] = useState(false);
  const [listaMovimientosPieza, setListaMovimientosPieza] = useState([]);
  const [referenciaPieza, setReferenciaPieza] = useState();

  const handleClickInventarioFecha = () => {
    setPdfInventario(false);
    setFormFechaInventario(true);
    setTablaInventarioFecha(false);
    setFormSeleccionarPieza(false);
    setPdfMovimientosPieza(false);
  };

  const inventarioFecha = (fecha) => {
    obtenerInventarioFecha(fecha)
      .then((response) => {
        setFormFechaInventario(false);
        setTablaInventarioFecha(true);
        setFormSeleccionarPieza(false);
        setPdfMovimientosPieza(false);
        setListaInventarioFecha(response.data);
        setFechaInventario(fecha);
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const inventarioActual = () => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaAdaptada = `${año}-${mes}-${dia}`;

    setFormFechaInventario(false);
    setTablaInventarioFecha(false);
    setFormSeleccionarPieza(false);
    setPdfMovimientosPieza(false);

    obtenerInventarioFecha(fechaAdaptada)
      .then((response) => {
        setPdfInventario(true);
        setListaInventarioFecha(response.data);
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje))
      .catch((error) => error.response.status === 400
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const handleClickMovimientosPieza = () => {
    setPdfInventario(false);
    setFormFechaInventario(false);
    setTablaInventarioFecha(false);
    setFormSeleccionarPieza(true);
    setPdfMovimientosPieza(false);
  };

  const movimientosPieza = (referencia) => {
    setFormSeleccionarPieza(false);

    obtenerMovimientosPieza(referencia)
      .then((response) => {
        setPdfMovimientosPieza(true);
        setListaMovimientosPieza(response.data);
        setReferenciaPieza(referencia);
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
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
          <Button variant="text" onClick={inventarioActual}>INVENTARIO ACTUAL DE PIEZAS EN ALMACEN</Button>
          <Button variant="text" onClick={handleClickInventarioFecha}>INVENTARIO DE PIEZAS EN ALMACEN (Fecha)</Button>
          <Button variant="text" onClick={handleClickMovimientosPieza}>MOVIMIENTOS DE ALMACEN DE UNA PIEZA</Button>
        </Box>
      </Grid>
      <Grid item md={9}>
        {pdfInventario
          ? (
            <Box>
              <InventarioActualPDF
                listaInventarioActual={listaInventarioFecha}
              />
            </Box>
          ) : null}
        {formFechaInventario
          ? (
            <Box>
              <InventarioFechaForm
                inventarioFecha={inventarioFecha}
              />
            </Box>
          ) : null}
        {tablaInventarioFecha
          ? (
            <Box>
              <InventarioFechaPDF
                listaInventario={listaInventarioFecha}
                fechaInventario={fechaInventario}
              />
            </Box>
          ) : null}
        {formSeleccionarPieza
          ? (
            <Box sx={{ width: '40%' }}>
              <BuscarPiezaPorReferenciaForm
                label="Seleccionar Pieza"
                obtener={movimientosPieza}
              />
            </Box>
          ) : null}
        {pdfMovimientosPieza
          ? (
            <Box>
              <MovimientosPiezaPDF
                listaMovimientosPieza={listaMovimientosPieza}
                referenciaPieza={referenciaPieza}
              />
            </Box>
          ) : null}
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </Grid>
  );
}
