import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

export default function BuscarAlbaranPorIdForm({ label, obtener, cerrar }) {
  const idRef = useRef();

  const handleSubmitForm = () => {
    obtener(idRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      id: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label={label} />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="id"
            size="small"
            value={formik.values.id}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            inputRef={idRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}
