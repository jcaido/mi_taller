import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

function BuscarOrdenReparacionPorMatriculaForm({ obtener }) {
  const matriculaRef = useRef();

  const handleSubmitForm = () => {
    if (matriculaRef.current.value !== '') {
      obtener(matriculaRef.current.value);
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
      <CabeceraForms label="Seleccionar vehículo" />
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

export default BuscarOrdenReparacionPorMatriculaForm;
