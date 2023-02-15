import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';

function BuscarCodigoPostalPorCodigoForm({ label, obtener, cerrar }) {
  const codigoRef = useRef();

  const handleSubmitForm = () => {
    obtener(codigoRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      codigo: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      {/* <Box>
        <Divider>
          <Chip label={label} />
        </Divider>
      </Box> */}
      <CabeceraForms label={label} />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="codigo"
            name="codigo"
            label="codigo"
            size="small"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
            helperText={formik.touched.codigo && formik.errors.codigo}
            inputRef={codigoRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default BuscarCodigoPostalPorCodigoForm;
