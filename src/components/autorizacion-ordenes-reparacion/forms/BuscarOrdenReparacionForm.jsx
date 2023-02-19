import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';
import CabeceraForms from '../../CabeceraForms';
import useChangeRadioGroupAutOrdenes from '../../../hooks/useChangeRadioGroupAutOrdenes';
import useChangeFecha from '../../../hooks/useChangeFecha';

function BuscarOrdenReparacionForm() {
  const {
    ListarOrdenesReparacionAbiertasPorFechaApertura,
    ListarOrdenesReparacionAbiertasPorVehiculo,
  } = useContext(AutorizacionOrdenesContext);

  const matriculaRef = useRef();
  const fechaAperturaRef = useRef();

  const changeRadioGroup = useChangeRadioGroupAutOrdenes('fecha-apertura');

  const changeFecha = useChangeFecha(new Date());

  const handleSubmitForm = () => {
    switch (changeRadioGroup.value) {
      case 'fecha-apertura':
        ListarOrdenesReparacionAbiertasPorFechaApertura(fechaAperturaRef.current.value);
        break;
      case 'vehiculo':
        ListarOrdenesReparacionAbiertasPorVehiculo(matriculaRef.current.value);
        break;
      default:
        break;
    }
  };

  const formik = useFormik({

    initialValues: {
      matricula: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Buscar orden de reparacion" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={changeRadioGroup.value}
              onChange={changeRadioGroup.handleChangeCierre}
            >
              <FormControlLabel value="fecha-apertura" control={<Radio />} label="fecha apertura" />
              <FormControlLabel value="vehiculo" control={<Radio />} label="vehiculo(matricula)" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box m={1}>
          {
            changeRadioGroup.value === 'fecha-apertura' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  id="fechaApertura"
                  name="fechaApertura"
                  label="fecha de apertura"
                  inputFormat="YYYY-MM-DD"
                  value={changeFecha.value}
                  onChange={changeFecha.handleChange}
                  error={formik.touched.fechaApertura
                  && Boolean(formik.errors.fechaApertura)}
                  helperText={formik.touched.fechaApertura
                  && formik.errors.fechaApertura}
                  renderInput={(params) => <TextField {...params} />}
                  inputRef={fechaAperturaRef}
                />
              </Stack>
            </LocalizationProvider>
            )
          }
          {
            changeRadioGroup.value === 'vehiculo' && (
            <TextField
              fullWidth
              id="matricula"
              name="matricula"
              label="matricula"
              size="small"
              value={formik.values.matricula}
              onChange={formik.handleChange}
              error={formik.touched.matricula && Boolean(formik.errors.matricula)}
              helperText={formik.touched.valor && formik.errors.valor}
              inputRef={matriculaRef}
            />
            )
          }
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default BuscarOrdenReparacionForm;
