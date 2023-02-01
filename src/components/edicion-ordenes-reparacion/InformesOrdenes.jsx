import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonEdiOrdenes from './NavigationButtonEdiOrdenes';
import OrdenesAbiertasPDF from './OrdenesAbiertasPDF';
import OrdenesCerradasEntreFechasForm from './forms/OrdenesCerradasEntreFechasForm';
import { obtenerOrdenesCerradasEntreFechas } from '../../services/axiosService';
import OrdenesCerradasEntreFechasPDF from './OrdenesCerradasEntreFechasPDF';

function InformesOrdenes() {
  const [tablaOrdenesReparacionAbiertas, setTablaOrdenesReparacionAbiertas] = useState(false);
  const [formEntreFechas, setFormEntreFechas] = useState(false);
  const [tablaOrdenesCerradasEntreFechas, setTablaOrdenesCerradasEntreFechas] = useState(false);
  const [formSeleccionarOrdenReparacion, setFormSeleccionarOrdenReparacion] = useState(false);
  const [formSeleccionarVehiculo, setFormSeleccionarVehiculo] = useState(false);

  const [
    listaOrdenesReparacionCerradasEntreFechas,
    setListaOrdenesReparacionCerradasEntreFechas,
  ] = useState([]);

  const handleClickOrdenesReparacionAbiertas = () => {
    setTablaOrdenesReparacionAbiertas(true);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setFormSeleccionarVehiculo(false);
  };

  const handleClickOrdenesReparacionCerradas = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(true);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setFormSeleccionarVehiculo(false);
  };

  const handleClickOrdenReparacionValorada = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(true);
    setFormSeleccionarVehiculo(false);
  };

  const handleClickHistoricoOrdenesVehiculo = () => {
    setTablaOrdenesReparacionAbiertas(false);
    setFormEntreFechas(false);
    setTablaOrdenesCerradasEntreFechas(false);
    setFormSeleccionarOrdenReparacion(false);
    setFormSeleccionarVehiculo(true);
  };

  const [fechaInicialProp, setFechaInicialProp] = useState();
  const [fechaFinalProp, setFechaFinalProp] = useState();

  const ordenesCerradasEntreFechas = (fechaInicial, fechaFinal) => {
    obtenerOrdenesCerradasEntreFechas(fechaInicial, fechaFinal)
      .then((response) => {
        setFormEntreFechas(false);
        setTablaOrdenesCerradasEntreFechas(true);
        setListaOrdenesReparacionCerradasEntreFechas(response.data);
        setFechaInicialProp(fechaInicial);
        setFechaFinalProp(fechaFinal);
      });
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEdiOrdenes />
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
          { formSeleccionarOrdenReparacion ? <p>formulario buscar orden</p> : null }
          { formSeleccionarVehiculo ? <p>formulario buscar vehiculo</p> : null }
        </Box>
      </Grid>
    </Grid>
  );
}

export default InformesOrdenes;
