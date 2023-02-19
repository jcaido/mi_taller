import React, { useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import CabeceraForms from '../../CabeceraForms';
import useChangeFecha from '../../../hooks/useChangeFecha';

const validationSchema = yup.object({
  fechaCierreInicial: yup
    .date()
    .nullable()
    .required('La fecha de cierre inicial es obligatoria'),
  fechaCierreFinal: yup
    .date()
    .nullable()
    .required('La fecha de cierre final es obligatoria'),
});

function OrdenesCerradasEntreFechasForm({ ordenesCerradasEntreFechas }) {
  const fechaCierreInicialRef = useRef();
  const fechaCierreFinalRef = useRef();

  const changeFechaInicial = useChangeFecha(new Date());

  const changeFechaFinal = useChangeFecha(new Date());

  const formik = useFormik({
    initialValues: {
      fechaCierreInicial: changeFechaInicial.value,
      fechaCierreFinal: changeFechaFinal.value,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  const handleSubmitForm = () => {
    const fechaInicial = fechaCierreInicialRef.current.value.split('-');
    const fechaInicialAdaptada = `${fechaInicial[2]}-${fechaInicial[1]}-${fechaInicial[0]}`;
    const fechaFinal = fechaCierreFinalRef.current.value.split('-');
    const fechaFinalAdaptada = `${fechaFinal[2]}-${fechaFinal[1]}-${fechaFinal[0]}`;
    ordenesCerradasEntreFechas(fechaInicialAdaptada, fechaFinalAdaptada);
  };

  return (
    <Box m={2} sx={{ width: '40%' }}>
      <CabeceraForms label="Buscar órdenes de reparación cerradas" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaCierreInicial"
                name="fechaCierreInicial"
                label="fecha de cierre inicial"
                inputFormat="DD-MM-YYYY"
                value={changeFechaInicial.value}
                onChange={changeFechaInicial.handleChange}
                error={formik.touched.fechaCierreInicial
                && Boolean(formik.errors.fechaCierreInicial)}
                helperText={formik.touched.fechaCierreInicial
                && formik.errors.fechaCierreInicial}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaCierreInicialRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaCierreFinal"
                name="fechaCierreFinal"
                label="fecha de cierre final"
                inputFormat="DD-MM-YYYY"
                value={changeFechaFinal.value}
                onChange={changeFechaFinal.handleChange}
                error={formik.touched.fechaCierreFinal
                && Boolean(formik.errors.fechaCierreFinal)}
                helperText={formik.touched.fechaCierreFinal
                && formik.errors.fechaCierreFinal}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaCierreFinalRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        { changeFechaFinal.value < changeFechaInicial.value
          ? (
            <Stack sx={{ width: '92%', marginLeft: 2 }} spacing={3}>
              <Alert severity="error">La fecha final no puede ser inferior a la fecha inicial</Alert>
            </Stack>
          )
          : null }
        <Box m={1}>
          {changeFechaFinal.value < changeFechaInicial.value
            ? (<Button type="submit" color="primary" variant="contained" fullWidth disabled>Aceptar</Button>)
            : (<Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>)}
        </Box>
      </form>
    </Box>
  );
}

export default OrdenesCerradasEntreFechasForm;
