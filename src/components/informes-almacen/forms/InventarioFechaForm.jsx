import React, { useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useChangeFecha from '../../../hooks/useChangeFecha';
import CabeceraForms from '../../CabeceraForms';

const validationSchema = yup.object({
  fecha: yup
    .date()
    .nullable()
    .required('La fecha es obligatoria'),
});

export default function InventarioFechaForm({ inventarioFecha }) {
  const fechaRef = useRef();

  const changeFecha = useChangeFecha(new Date());

  const formik = useFormik({
    initialValues: {
      fecha: changeFecha.value,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  const handleSubmitForm = () => {
    const fecha = fechaRef.current.value.split('-');
    const fechaAdaptada = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;
    inventarioFecha(fechaAdaptada);
  };

  return (
    <Box m={2} sx={{ width: '40%' }}>
      <CabeceraForms label="Seleccionar fecha" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fecha"
                name="fecha"
                label="fecha inventario"
                inputFormat="DD-MM-YYYY"
                value={changeFecha.value}
                onChange={changeFecha.handleChange}
                error={formik.touched.fecha
                && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha
                && formik.errors.fecha}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Aceptar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
