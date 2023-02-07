import React, { useState } from 'react';
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
import BuscarOrdenReparacionPorIdForm from '../autorizacion-ordenes-reparacion/forms/BuscarOrdenReparacionPorIdForm';
import OrdenCerradaPorIdPDF from './OrdenCerradaPorIdPDF';
import ModalErrores from '../../utils/ModalErrores';
import NavigationButtonInfoOrdenes from './NavigationButtonInfoOrdenes';
import BuscarOrdenReparacionPorMatriculaForm from './forms/BuscarOrdenReparacionPorMatriculaForm';
import HistoricoOrdenesCerradasPorVehiculoPDF from './HistoricoOrdenesCerradasPorVehiculoPDF';

function InformesOrdenes() {
  const [openError, setOpenError] = useState(false);
  const [message, setMensaje] = useState('');

  const handleOpenError = (messag) => {
    setOpenError(true);
    setMensaje(messag);
  };

  const handleCloseError = () => setOpenError(false);

  const [tablaOrdenesReparacionAbiertas, setTablaOrdenesReparacionAbiertas] = useState(false);
  const [formEntreFechas, setFormEntreFechas] = useState(false);
  const [tablaOrdenesCerradasEntreFechas, setTablaOrdenesCerradasEntreFechas] = useState(false);
  const [formSeleccionarOrdenReparacion, setFormSeleccionarOrdenReparacion] = useState(false);
  const [ordenCerradaPorId, setOrdenCerradaPorId] = useState(false);
  const [formSeleccionarVehiculo, setFormSeleccionarVehiculo] = useState(false);
  const [historicoOrdenesVehiculo, setHistoricoOrdenesVehiculo] = useState(false);

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
  };

  const handleClickOrdenesReparacionCerradas = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(true);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
  };

  const handleClickOrdenReparacionValorada = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(true);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(false);
    setHistoricoOrdenesVehiculo(false);
  };

  const handleClickHistoricoOrdenesVehiculo = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setOrdenCerradaPorId(false);
    setFormSeleccionarVehiculo(true);
    setHistoricoOrdenesVehiculo(false);
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
        setListaOrdenesReparacionCerradasEntreFechas(response.data);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
      });
  };

  const ordenReparacionPorId = (id) => {
    obtenerOrdenReparacionPorIdCompleta(id)
      .then((response) => {
        if (!response.data.cerrada) {
          handleOpenError('La orden de reparación no está cerrada');
        } else {
          setTablaOrdenesReparacionAbiertas(false);
          setFormEntreFechas(false);
          setTablaOrdenesCerradasEntreFechas(false);
          setFormSeleccionarOrdenReparacion(false);
          setOrdenCerradaPorId(true);
          setFormSeleccionarVehiculo(false);
          setHistoricoOrdenesVehiculo(false);
          setOrdenReparacionCerradaPorId(response.data);
        }
      });
  };

  const ordenReparacionPorVehiculo = (matricula) => {
    obtenerVehiculosPorMatricula(matricula)
      .then((response) => {
        obtenerOrdenesReparacionCerradasPorVehiculo(response.data.id)
          .then((res) => {
            setTablaOrdenesReparacionAbiertas(false);
            setFormEntreFechas(false);
            setTablaOrdenesCerradasEntreFechas(false);
            setFormSeleccionarOrdenReparacion(false);
            setOrdenCerradaPorId(false);
            setFormSeleccionarVehiculo(false);
            setHistoricoOrdenesVehiculo(true);
            setHistoriosOrdenesCerradasPorVehiculo(res.data);
          });
      });
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonInfoOrdenes />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box mt={2}>
          <Button variant="text" onClick={handleClickOrdenesReparacionAbiertas}>ORDENES DE REPARACION ABIERTAS</Button>
          <Button variant="text" onClick={handleClickOrdenesReparacionCerradas}>ORDENES DE REPARACION CERRADAS</Button>
          <Button variant="text" onClick={handleClickOrdenReparacionValorada}>ORDEN DE REPARACION VALORADA</Button>
          <Button variant="text" onClick={handleClickHistoricoOrdenesVehiculo}>HISTORICO ORDENES CERRADAS (VEHICULO)</Button>
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
                <BuscarOrdenReparacionPorIdForm
                  label="Seleccionar orden de reparacion"
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
          {historicoOrdenesVehiculo
            ? (
              <HistoricoOrdenesCerradasPorVehiculoPDF
                historico={historiosOrdenesCerradasPorVehiculo}
              />
            ) : null }
        </Box>
        <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError} />
      </Grid>
    </Grid>
  );
}

export default InformesOrdenes;
