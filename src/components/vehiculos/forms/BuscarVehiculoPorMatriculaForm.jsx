import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

function BuscarVehiculoPorMatriculaForm({ label, obtener, cerrar }) {
  const matriculaRef = useRef();

  const handleSubmitForm = () => {
    obtener(matriculaRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      matricula: '',
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
            id="matricula"
            name="matricula"
            label="matricula"
            size="small"
            value={formik.values.matricula}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
            helperText={formik.touched.matricula && formik.errors.matricula}
            inputRef={matriculaRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default BuscarVehiculoPorMatriculaForm;
