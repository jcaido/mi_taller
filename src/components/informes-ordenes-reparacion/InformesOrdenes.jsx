import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import OrdenesAbiertasPDF from './OrdenesAbiertasPDF';
import OrdenesCerradasEntreFechasForm from './forms/OrdenesCerradasEntreFechasForm';
import {
  obtenerOrdenesCerradasEntreFechas,
  obtenerOrdenesReparacionCerradasPorVehiculo,
  obtenerOrdenReparacionPorIdCompleta,
  obtenerVehiculosPorMatricula,
} from '../../services/axiosService';
import OrdenesCerradasEntreFechasPDF from './OrdenesCerradasEntreFechasPDF';
import OrdenCerradaPorIdPDF from './OrdenCerradaPorIdPDF';
import ModalErrores from '../../utils/ModalErrores';
import NavigationButtonInfoOrdenes from '../NavigationButtonInformes';
import BuscarOrdenReparacionPorMatriculaForm from './forms/BuscarOrdenReparacionPorMatriculaForm';
import HistoricoOrdenesCerradasPorVehiculoPDF from './HistoricoOrdenesCerradasPorVehiculoPDF';
import PreciosManoDeObraPDF from './PreciosManoDeObraPDF';
import ResumenOrdenesCerradasEntreFechasPDF from './ResumenOrdenesCerradasEntreFechasPDF';
import useModal from '../../hooks/useModal';
import BuscarPorUnInput from '../BuscarPorUnInput';

function InformesOrdenes() {
  const modal = useModal();

  const navigate = useNavigate();

  const [tablaOrdenesReparacionAbiertas, setTablaOrdenesReparacionAbiertas] = useState(false);
  const [formEntreFechas, setFormEntreFechas] = useState(false);
  const [tablaOrdenesCerradasEntreFechas, setTablaOrdenesCerradasEntreFechas] = useState(false);
  const [formSeleccionarOrdenReparacion, setFormSeleccionarOrdenReparacion] = useState(false);
  const [ordenCerradaPorId, setOrdenCerradaPorId] = useState(false);
  const [formSeleccionarVehiculo, setFormSeleccionarVehiculo] = useState(false);
  const [historicoOrdenesVehiculo, setHistoricoOrdenesVehiculo] = useState(false);
  const [historicoPreciosManoDeObra, setHistoricoPreciosManoDeObra] = useState(false);
  const [formEntreFechasResumen, setFormEntreFechasResumen] = useState(false);
  const [tablaResumenOrdenesCerradas, setTablaResumenOrdenesCerradas] = useState(false);

  const [
    listaOrdenesReparacionCerradasEntreFechas,
    setListaOrdenesReparacionCerradasEntreFechas,
  ] = useState([]);

  const [ordenReparacionCerradaPorId, setOrdenReparacionCerradaPorId] = useState([]);

  const [
    historiosOrdenesCerradasPorVehiculo,
    setHistoriosOrdenesCerradasPorVehiculo,
  ] = useState([]);

  const handleClickOrdenesReparacionAbiertas = () => {
    setTablaOrdenesReparacionAbiertas(true);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(false);
    setFormEntreFechasResumen(false);
    setTablaResumenOrdenesCerradas(false);
  };

  const handleClickOrdenesReparacionCerradas = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(true);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(false);
    setFormEntreFechasResumen(false);
    setTablaResumenOrdenesCerradas(false);
  };

  const handleClickOrdenReparacionValorada = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(true);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(false);
    setFormEntreFechasResumen(false);
    setTablaResumenOrdenesCerradas(false);
  };

  const handleClickHistoricoOrdenesVehiculo = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(true);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(false);
    setFormEntreFechasResumen(false);
    setTablaResumenOrdenesCerradas(false);
  };

  const handleClickResumeOrdenesCerradas = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(false);
    setFormEntreFechasResumen(true);
    setTablaResumenOrdenesCerradas(false);
  };

  const handleClickHistoricoPrecioManoDeObra = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
    setHistoricoPreciosManoDeObra(true);
    setFormEntreFechasResumen(false);
    setTablaResumenOrdenesCerradas(false);
  };

  const [fechaInicialProp, setFechaInicialProp] = useState();
  const [fechaFinalProp, setFechaFinalProp] = useState();

  const ordenesCerradasEntreFechas = (fechaInicial, fechaFinal) => {
    obtenerOrdenesCerradasEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setTablaOrdenesReparacionAbiertas(false);
        setFormEntreFechas(false);
        setTablaOrdenesCerradasEntreFechas(true);
        setFormSeleccionarOrdenReparacion(false);
        setOrdenCerradaPorId(false);
        setFormSeleccionarVehiculo(false);
        setHistoricoOrdenesVehiculo(false);
        setFormEntreFechasResumen(false);
        setTablaResumenOrdenesCerradas(false);
        setListaOrdenesReparacionCerradasEntreFechas(response.data);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          modal.handleOpenError('error en las fechas');
        } else {
          modal.handleOpenError(`error: ${error}`);
        }
      });
  };

  const resumenOrdenesCerradasEntreFechas = (fechaInicial, fechaFinal) => {
    obtenerOrdenesCerradasEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setTablaOrdenesReparacionAbiertas(false);
        setFormEntreFechas(false);
        setTablaOrdenesCerradasEntreFechas(false);
        setFormSeleccionarOrdenReparacion(false);
        setOrdenCerradaPorId(false);
        setFormSeleccionarVehiculo(false);
        setHistoricoOrdenesVehiculo(false);
        setFormEntreFechasResumen(false);
        setTablaResumenOrdenesCerradas(true);
        setListaOrdenesReparacionCerradasEntreFechas(response.data);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          modal.handleOpenError('error en las fechas');
        } else {
          modal.handleOpenError(`error: ${error}`);
        }
      });
  };

  const ordenReparacionPorId = (id) => {
    obtenerOrdenReparacionPorIdCompleta(id)
      .then((response) => {
        if (!response.data.cerrada) {
          modal.handleOpenError('La orden de reparación no está cerrada');
        } else {
          setTablaOrdenesReparacionAbiertas(false);
          setFormEntreFechas(false);
          setTablaOrdenesCerradasEntreFechas(false);
          setFormSeleccionarOrdenReparacion(false);
          setOrdenCerradaPorId(true);
          setFormSeleccionarVehiculo(false);
          setHistoricoOrdenesVehiculo(false);
          setFormEntreFechasResumen(false);
          setTablaResumenOrdenesCerradas(false);
          setOrdenReparacionCerradaPorId(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) { modal.handleOpenError(error.response.data.mensaje); }
        if (error.response.status === 400) { modal.handleOpenError('referencia incorrecta'); }
      });
  };

  const ordenReparacionPorVehiculo = (matricula) => {
    obtenerVehiculosPorMatricula(matricula)
      .then((response) => {
        obtenerOrdenesReparacionCerradasPorVehiculo(response.data.id)
          .then((res) => {
            if (res.data.length === 0) {
              modal.handleOpenError('El vehículo indicado no tiene ordenes de reparación cerradas');
            } else {
              setTablaOrdenesReparacionAbiertas(false);
              setFormEntreFechas(false);
              setTablaOrdenesCerradasEntreFechas(false);
              setFormSeleccionarOrdenReparacion(false);
              setOrdenCerradaPorId(false);
              setFormSeleccionarVehiculo(false);
              setHistoricoOrdenesVehiculo(true);
              setFormEntreFechasResumen(false);
              setTablaResumenOrdenesCerradas(false);
              setHistoriosOrdenesCerradasPorVehiculo(res.data);
            }
          })
          .catch((error) => {
            modal.handleOpenError(`Error: ${error}`);
          });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          modal.handleOpenError('La matrícula indicada no existe');
        } else {
          modal.handleOpenError(`error: ${error}`);
        }
      });
  };

  const handleClickBotonRegresar = () => {
    navigate('/taller/opciones');
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonInfoOrdenes botonRegresar={handleClickBotonRegresar} />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box mt={2}>
          <Button variant="text" onClick={handleClickOrdenesReparacionAbiertas}>ORDENES DE REPARACION ABIERTAS</Button>
          <Button variant="text" onClick={handleClickOrdenesReparacionCerradas}>ORDENES DE REPARACION CERRADAS</Button>
          <Button variant="text" onClick={handleClickOrdenReparacionValorada}>ORDEN DE REPARACION VALORADA</Button>
          <Button variant="text" onClick={handleClickHistoricoOrdenesVehiculo}>HISTORICO ORDENES CERRADAS (VEHICULO)</Button>
          <Button variant="text" onClick={handleClickResumeOrdenesCerradas}>RESUMEN ORDENES DE REPARACIÓN CERRADAS</Button>
          <Button variant="text" onClick={handleClickHistoricoPrecioManoDeObra}>HISTORICO DE PRECIOS DE MANO DE OBRA </Button>
        </Box>
      </Grid>
      <Grid item md={9}>
        <Box>
          { tablaOrdenesReparacionAbiertas ? <OrdenesAbiertasPDF /> : null }
          { formEntreFechas
            ? (
              <OrdenesCerradasEntreFechasForm
                ordenesCerradasEntreFechas={ordenesCerradasEntreFechas}
              />
            )
            : null }
          { tablaOrdenesCerradasEntreFechas
            ? (
              <OrdenesCerradasEntreFechasPDF
                listaOrdenes={listaOrdenesReparacionCerradasEntreFechas}
                fecInicial={fechaInicialProp}
                fecFinal={fechaFinalProp}
              />
            )
            : null }
          { formSeleccionarOrdenReparacion
            ? (
              <Box sx={{ width: '30%' }}>
                <BuscarPorUnInput
                  label="Seleccionar orden de reparacion"
                  textInput="id"
                  inputLabel="referencia(id)"
                  obtener={ordenReparacionPorId}
                />
              </Box>
            )
            : null }
          { ordenCerradaPorId
            ? (
              <OrdenCerradaPorIdPDF
                ordenCerrada={ordenReparacionCerradaPorId}
              />
            )
            : null }
          { formSeleccionarVehiculo
            ? (
              <Box sx={{ width: '30%' }}>
                <BuscarOrdenReparacionPorMatriculaForm
                  obtener={ordenReparacionPorVehiculo}
                />
              </Box>
            ) : null }
          { historicoOrdenesVehiculo
            ? (
              <HistoricoOrdenesCerradasPorVehiculoPDF
                historico={historiosOrdenesCerradasPorVehiculo}
              />
            ) : null }
          { historicoPreciosManoDeObra ? <PreciosManoDeObraPDF /> : null }
          { formEntreFechasResumen
            ? (
              <OrdenesCerradasEntreFechasForm
                ordenesCerradasEntreFechas={resumenOrdenesCerradasEntreFechas}
              />
            )
            : null }
          { tablaResumenOrdenesCerradas
            ? (
              <ResumenOrdenesCerradasEntreFechasPDF
                listaOrdenes={listaOrdenesReparacionCerradasEntreFechas}
                fecInicial={fechaInicialProp}
                fecFinal={fechaFinalProp}
              />
            ) : null }
        </Box>
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </Grid>
  );
}

export default InformesOrdenes;
