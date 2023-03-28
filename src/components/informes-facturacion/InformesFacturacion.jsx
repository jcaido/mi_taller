import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import FacturasProveedoresForm from './forms/FacturasProveedoresForm';
import { obtenerFacturasPorProveedorEntreFechas, obtenerFacturasProveedoresEntreFechas, obtenerProveedorPorId } from '../../services/axiosService';
import FacturacionProveedoresEntreFechasPDF from './FacturacionProveedoresEntreFechasPDF';
import FacturasPorProveedorForm from './forms/FacturasPorProveedorForm';
import FacturacionPorProveedorEntreFechasPDF from './FacturacionPorProveedorEntreFechasPDF';

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
    tablaFacturasPorProveedorEntreFechas,
    setTablaFacturasPorProveedorEntreFechas] = useState(false);

  const [
    listaFacturasProveedoresEntreFechas, setListaFacturasProveedoresEntreFechas] = useState([]);

  const [
    listaFacturasPorProveedorEntreFechas, setListaFacturasPorProveedorEntreFechas] = useState([]);

  const [idProveeor, setIdProveedor] = useState();
  const [nombreProveedor, setNombreProveedor] = useState();
  const [cifProveedor, setCifProveedor] = useState();
  const [fechaInicialProp, setFechaInicialProp] = useState();
  const [fechaFinalProp, setFechaFinalProp] = useState();

  const handleClickFacturasProveedores = () => {
    setFormFacturasProveedorEntreFechas(true);
    setFormFacturasPorProveedorEntreFechas(false);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
  };

  const handleClickFacturasPorProveedor = () => {
    setFormFacturasProveedorEntreFechas(false);
    setFormFacturasPorProveedorEntreFechas(true);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
  };

  const obtenerFacturasProveedores = (fechaInicial, fechaFinal) => {
    obtenerFacturasProveedoresEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(true);
        setTablaFacturasPorProveedorEntreFechas(false);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasProveedoresEntreFechas(response.data);
      })
      .catch(() => {
        //
      });
  };

  const obtenerFacturasPorProveedor = (idProveedor, fechaInicial, fechaFinal) => {
    obtenerFacturasPorProveedorEntreFechas(idProveedor, fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(false);
        setTablaFacturasPorProveedorEntreFechas(true);
        setIdProveedor(idProveedor);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasPorProveedorEntreFechas(response.data);
        obtenerProveedorPorId(idProveedor)
          .then((res) => {
            setNombreProveedor(res.data.nombre);
            setCifProveedor(res.data.dniCif);
          });
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
          {formFacturasPorProveedorEntreFechas
            ? (
              <FacturasPorProveedorForm
                obtenerFacturasPorProveedor={obtenerFacturasPorProveedor}
              />
            ) : null}
          {tablaFacturaProveedoresEntreFechas
            ? (
              <FacturacionProveedoresEntreFechasPDF
                listaFacturasProveedores={listaFacturasProveedoresEntreFechas}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
          {tablaFacturasPorProveedorEntreFechas
            ? (
              <FacturacionPorProveedorEntreFechasPDF
                listaFacturasPorProveedorEntreFechas={listaFacturasPorProveedorEntreFechas}
                idProveeor={idProveeor}
                nombreProveedor={nombreProveedor}
                cifProveedor={cifProveedor}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
