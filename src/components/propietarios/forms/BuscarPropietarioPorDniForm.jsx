import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

function BuscarPropietarioPorDniForm({ label, obtener, cerrar }) {
  const dniRef = useRef();

  const handleSubmitForm = () => {
    obtener(dniRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      dni: '',
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
            id="dni"
            name="dni"
            label="dni"
            size="small"
            value={formik.values.dni}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
            inputRef={dniRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default BuscarPropietarioPorDniForm;
