import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

export default function BuscarProveedorPorDniCifForm({ label, obtener, cerrar }) {
  const dniCifRef = useRef();

  const handleSubmitForm = () => {
    obtener(dniCifRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      dni_cif: '',
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
            id="dni_cif"
            name="dni_cif"
            label="dni / cif"
            size="small"
            value={formik.values.dni_cif}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.dni_cif && Boolean(formik.errors.dni_cif)}
            helperText={formik.touched.dni_cif && formik.errors.dni_cif}
            inputRef={dniCifRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}
