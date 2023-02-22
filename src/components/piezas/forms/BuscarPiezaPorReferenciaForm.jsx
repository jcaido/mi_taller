import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

export default function BuscarPiezaPorReferenciaForm({ label, obtener, cerrar }) {
  const referenciaRef = useRef();

  const handleSubmitForm = () => {
    obtener(referenciaRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      referencia: '',
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
            id="referencia"
            name="referencia"
            label="referencia"
            size="small"
            value={formik.values.referencia}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.referencia && Boolean(formik.errors.referencia)}
            helperText={formik.touched.referencia && formik.errors.referencia}
            inputRef={referenciaRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}
