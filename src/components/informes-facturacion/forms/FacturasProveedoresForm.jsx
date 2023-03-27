import React, { useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useChangeFecha from '../../../hooks/useChangeFecha';
import CabeceraForms from '../../CabeceraForms';

const validationSchema = yup.object({
  fechaFacturaInicial: yup
    .date()
    .nullable()
    .required('La fecha de factura inicial es obligatoria'),
  fechaFacturaFinal: yup
    .date()
    .nullable()
    .required('La fecha de factura final es obligatoria'),
});

export default function FacturasProveedoresForm({ obtenerFacturasProveedores }) {
  const fechaFacturaInicialRef = useRef();
  const fechaFacturaFinalRef = useRef();

  const changeFechaInicial = useChangeFecha(new Date());
  const changeFechaFinal = useChangeFecha(new Date());

  const formik = useFormik({
    initialValues: {
      fechaFacturaInicial: changeFechaInicial.value,
      fechaFacturaFinal: changeFechaFinal.value,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  const handleSubmitForm = () => {
    const fechaInicial = fechaFacturaInicialRef.current.value.split('-');
    const fechaInicialAdaptada = `${fechaInicial[2]}-${fechaInicial[1]}-${fechaInicial[0]}`;
    const fechaFinal = fechaFacturaFinalRef.current.value.split('-');
    const fechaFinalAdaptada = `${fechaFinal[2]}-${fechaFinal[1]}-${fechaFinal[0]}`;
    obtenerFacturasProveedores(fechaInicialAdaptada, fechaFinalAdaptada);
  };

  return (
    <Box m={2} sx={{ width: '40%' }}>
      <CabeceraForms label="Buscar facturas de proveedores" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaFacturaInicial"
                name="fechaFacturaInicial"
                label="fecha de factura inicial"
                inputFormat="DD-MM-YYYY"
                value={changeFechaInicial.value}
                onChange={changeFechaInicial.handleChange}
                error={formik.touched.fechaFacturaInicial
                && Boolean(formik.errors.fechaFacturaInicial)}
                helperText={formik.touched.fechaFacturaInicial
                && formik.errors.fechaFacturaInicial}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaFacturaInicialRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaFacturaFinal"
                name="fechaFacturaFinal"
                label="fecha de factura final"
                inputFormat="DD-MM-YYYY"
                value={changeFechaFinal.value}
                onChange={changeFechaFinal.handleChange}
                error={formik.touched.fechaFacturaFinal
                && Boolean(formik.errors.fechaFacturaFinal)}
                helperText={formik.touched.fechaFacturaFinal
                && formik.errors.fechaFacturaFinal}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaFacturaFinalRef}
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
