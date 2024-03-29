import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import FacturasProveedoresForm from './forms/FacturasProveedoresForm';
import {
  obtenerFacturasClientessEntreFechas,
  obtenerFacturasPorClienteEntreFechas,
  obtenerFacturasPorProveedorEntreFechas,
  obtenerFacturasProveedoresEntreFechas,
  obtenerPropietarioPorId,
  obtenerProveedorPorId,
} from '../../services/axiosService';
import FacturacionProveedoresEntreFechasPDF from './FacturacionProveedoresEntreFechasPDF';
import FacturasPorProveedorForm from './forms/FacturasPorProveedorForm';
import FacturacionPorProveedorEntreFechasPDF from './FacturacionPorProveedorEntreFechasPDF';
import FacturasClientesForm from './forms/FacturasClientesForm';
import FacturacionClientesEntreFechasPDF from './FacturacionClientesEntreFechasPDF';
import FacturasPorClienteForm from './forms/FacturasPorClienteForm';
import FacturacionPorClienteEntreFechasPDF from './FacturacionPorClienteEntreFechasPDF';

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

  const [idProveedor, setIdProveedor] = useState();
  const [nombreProveedor, setNombreProveedor] = useState();
  const [cifProveedor, setCifProveedor] = useState();
  const [fechaInicialProp, setFechaInicialProp] = useState();
  const [fechaFinalProp, setFechaFinalProp] = useState();

  const [formFacturasClientesEntreFechas, setFormFacturasClientesEntreFechas] = useState(false);

  const [
    formFacturasPorClienteEntreFechas, setFormFacturasPorClienteEntreFechas] = useState(false);

  const [
    tablaFacturaClientesEntreFechas, setTablaFacturaClientesEntreFechas] = useState(false);

  const [
    listaFacturasPorClienteEntreFechas, setListaFacturasPorClienteEntreFechas] = useState([]);

  const [
    tablaFacturasPorClienteEntreFechas,
    setTablaFacturasPorClienteEntreFechas] = useState(false);

  const [
    listaFacturasClientesEntreFechas, setListaFacturasClientesEntreFechas] = useState([]);

  const [idCliente, setIdCliente] = useState();
  const [nombreCliente, setNombreCliente] = useState();
  const [primerApellido, setPrimerApellido] = useState();
  const [segundoApellido, setSegundoApellido] = useState();
  const [cifCliente, setCifCliente] = useState();

  const handleClickFacturasProveedores = () => {
    setFormFacturasProveedorEntreFechas(true);
    setFormFacturasPorProveedorEntreFechas(false);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
    setFormFacturasClientesEntreFechas(false);
    setFormFacturasPorClienteEntreFechas(false);
    setTablaFacturaClientesEntreFechas(false);
    setTablaFacturasPorClienteEntreFechas(false);
  };

  const handleClickFacturasPorProveedor = () => {
    setFormFacturasProveedorEntreFechas(false);
    setFormFacturasPorProveedorEntreFechas(true);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
    setFormFacturasClientesEntreFechas(false);
    setFormFacturasPorClienteEntreFechas(false);
    setTablaFacturaClientesEntreFechas(false);
    setTablaFacturasPorClienteEntreFechas(false);
  };

  const handleClickFacturasClientes = () => {
    setFormFacturasProveedorEntreFechas(false);
    setFormFacturasPorProveedorEntreFechas(false);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
    setFormFacturasClientesEntreFechas(true);
    setFormFacturasPorClienteEntreFechas(false);
    setTablaFacturaClientesEntreFechas(false);
    setTablaFacturasPorClienteEntreFechas(false);
  };

  const handleClickFacturasPorCliente = () => {
    setFormFacturasProveedorEntreFechas(false);
    setFormFacturasPorProveedorEntreFechas(false);
    setTablaFacturaProveedoresEntreFechas(false);
    setTablaFacturasPorProveedorEntreFechas(false);
    setFormFacturasClientesEntreFechas(false);
    setFormFacturasPorClienteEntreFechas(true);
    setTablaFacturaClientesEntreFechas(false);
    setTablaFacturasPorClienteEntreFechas(false);
  };

  const obtenerFacturasProveedores = (fechaInicial, fechaFinal) => {
    obtenerFacturasProveedoresEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(true);
        setTablaFacturasPorProveedorEntreFechas(false);
        setFormFacturasClientesEntreFechas(false);
        setFormFacturasPorClienteEntreFechas(false);
        setTablaFacturaClientesEntreFechas(false);
        setTablaFacturasPorClienteEntreFechas(false);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasProveedoresEntreFechas(response.data);
      })
      .catch(() => {
        //
      });
  };

  const obtenerFacturasPorProveedor = (idProv, fechaInicial, fechaFinal) => {
    obtenerFacturasPorProveedorEntreFechas(idProv, fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(false);
        setTablaFacturasPorProveedorEntreFechas(true);
        setFormFacturasClientesEntreFechas(false);
        setFormFacturasPorClienteEntreFechas(false);
        setTablaFacturaClientesEntreFechas(false);
        setTablaFacturasPorClienteEntreFechas(false);
        setIdProveedor(idProv);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasPorProveedorEntreFechas(response.data);
        obtenerProveedorPorId(idProv)
          .then((res) => {
            setNombreProveedor(res.data.nombre);
            setCifProveedor(res.data.dniCif);
          });
      })
      .catch(() => {
        //
      });
  };

  const obtenerFacturasClientes = (fechaInicial, fechaFinal) => {
    obtenerFacturasClientessEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(false);
        setTablaFacturasPorProveedorEntreFechas(false);
        setFormFacturasClientesEntreFechas(false);
        setFormFacturasPorClienteEntreFechas(false);
        setTablaFacturaClientesEntreFechas(true);
        setTablaFacturasPorClienteEntreFechas(false);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasClientesEntreFechas(response.data);
      })
      .catch(() => {
        //
      });
  };

  const obtenerFacturasPorCliente = (idCli, fechaInicial, fechaFinal) => {
    obtenerFacturasPorClienteEntreFechas(idCli, fechaInicial, fechaFinal)
      .then((response) => {
        setFormFacturasProveedorEntreFechas(false);
        setFormFacturasPorProveedorEntreFechas(false);
        setTablaFacturaProveedoresEntreFechas(false);
        setTablaFacturasPorProveedorEntreFechas(false);
        setFormFacturasClientesEntreFechas(false);
        setFormFacturasPorClienteEntreFechas(false);
        setTablaFacturaClientesEntreFechas(false);
        setTablaFacturasPorClienteEntreFechas(true);
        setIdCliente(idCli);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
        setListaFacturasPorClienteEntreFechas(response.data);
        obtenerPropietarioPorId(idCli)
          .then((res) => {
            setNombreCliente(res.data.nombre);
            setPrimerApellido(res.data.primerApellido);
            setSegundoApellido(res.data.segundoApellido);
            setCifCliente(res.data.dni);
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
          <Button variant="text" onClick={handleClickFacturasClientes}>LISTADO DE FACTURAS DE CLIENTES</Button>
          <Button variant="text" onClick={handleClickFacturasPorCliente}>LISTADO DE FACTURAS DE UN CLIENTE</Button>
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
                idProveeor={idProveedor}
                nombreProveedor={nombreProveedor}
                cifProveedor={cifProveedor}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
          {formFacturasClientesEntreFechas
            ? (
              <FacturasClientesForm
                obtenerFacturasClientes={obtenerFacturasClientes}
              />
            ) : null}
          {formFacturasPorClienteEntreFechas
            ? (
              <FacturasPorClienteForm
                obtenerFacturasPorCliente={obtenerFacturasPorCliente}
              />
            ) : null}
          {tablaFacturaClientesEntreFechas
            ? (
              <FacturacionClientesEntreFechasPDF
                listaFacturasClientesEntreFechas={listaFacturasClientesEntreFechas}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
          {tablaFacturasPorClienteEntreFechas
            ? (
              <FacturacionPorClienteEntreFechasPDF
                listaFacturasPorClienteEntreFechas={listaFacturasPorClienteEntreFechas}
                idCliente={idCliente}
                nombreCliente={nombreCliente}
                primerApellido={primerApellido}
                segundoApellido={segundoApellido}
                cifCliente={cifCliente}
                fechaInicial={fechaInicialProp}
                fechaFinal={fechaFinalProp}
              />
            ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
