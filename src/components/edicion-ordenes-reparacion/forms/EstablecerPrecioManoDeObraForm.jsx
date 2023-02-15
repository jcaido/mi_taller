import React, { useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import CabeceraForms from '../../CabeceraForms';

const validationSchema = yup.object({
  precio: yup
    .number('Introduzca el precio/hora de la mano de obra')
    .typeError('Introduzca un dato numerico')
    .required('El precio/hora es obligatorio'),
});

function EstablecerPrecioManoDeObraForm({ establecerManoDeObraActual, open, handleClose }) {
  const PrecioManoDeObraRef = useRef();

  const handleSubmitForm = () => {
    establecerManoDeObraActual(PrecioManoDeObraRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      precio: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Precio/hora mano de obra" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="precio"
            name="precio"
            label="precio-hora"
            size="small"
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
            inputRef={PrecioManoDeObraRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
        <ModalOK open={open} handleClose={handleClose} />
      </form>
    </Box>
  );
}

export default EstablecerPrecioManoDeObraForm;
