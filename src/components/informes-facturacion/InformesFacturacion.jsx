import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import FacturasProveedoresForm from './forms/FacturasProveedoresForm';
import { obtenerFacturasProveedoresEntreFechas } from '../../services/axiosService';
import FacturacionProveedoresEntreFechasPDF from './FacturacionProveedoresEntreFechasPDF';

export default function InformesFacturacion() {
  const navigate = useNavigate();

  const handleClickBotonRegresar = () => {
    navigate('/facturacion/opciones');
  };

  const [formFacturasProveedorEntreFechas, setFormFacturasProveedorEntreFechas] = useState(false);
  const [
    formFacturasPorProveedorEntreFechas, setFormFacturasPorProveedorEntreFechas] = useState(false);
  const [
    tablaFacturaProveedoresEntreFechas, setTablaFacturaProveedoresEntreFechas] = useState(false);
  const [
    listaFacturasProveedoresEntreFechas, setListaFacturasProveedoresEntreFechas] = useState([]);
  const [fechaInicialProp, setFechaInicialProp] = useState();
  const [fechaFinalProp, setFechaFinalProp] = useState();

  const handleClickFacturasProveedores = () => {
    setFormFacturasProveedorEntreFechas(true);
    setFormFacturasPorProveedorEntreFechas(false);
    setTablaFacturaProveedoresEntreFechas(false);
  };

  const handleClickFacturasPorProveedor = () => {
    setFormFacturasProveedorEntreFechas(false);
    setFormFacturasPorProveedorEntreFechas(true);
    setTablaFacturaProveedoresEntreFechas(false);
  };

  const obtenerFacturasProveedores = (fechaInicial, fechaFinal) => {
    obtenerFacturasProveedoresEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(true);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasProveedoresEntreFechas(response.data);
      })
      .catch(() => {
        //
      });
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
          <Button variant="text" onClick={handleClickFacturasProveedores}>LISTADO DE FACTURAS DE PROVEEDORES</Button>
          <Button variant="text" onClick={handleClickFacturasPorProveedor}>LISTADO DE FACTURAS DE UN PROVEEDOR</Button>
        </Box>
      </Grid>
      <Grid item md={9}>
        <Box>
          {formFacturasProveedorEntreFechas
            ? (
              <FacturasProveedoresForm
                obtenerFacturasProveedores={obtenerFacturasProveedores}
              />
            ) : null}
          {formFacturasPorProveedorEntreFechas ? <p>facturas por proveedor</p> : null}
          {tablaFacturaProveedoresEntreFechas
            ? (
              <FacturacionProveedoresEntreFechasPDF
                listaFacturasProveedores={listaFacturasProveedoresEntreFechas}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
