import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from './CabeceraForms';

export default function BuscarPorUnInput({
  label,
  textImput,
  inputLabel,
  obtener,
  cerrar,
}) {
  const inputRef = useRef();

  const handleSubmitForm = () => {
    obtener(inputRef.current.value);
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      input: '',
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
            id={textImput}
            name={textImput}
            label={inputLabel}
            size="small"
            value={formik.values.textImput}
            onChange={formik.handleChange}
            onFocus={cerrar}
            error={formik.touched.input && Boolean(formik.errors.input)}
            helperText={formik.touched.input && formik.errors.input}
            inputRef={inputRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}
