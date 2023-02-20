import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useChangeRadioGroup from '../../../hooks/useChangeRadioGroup';
import CabeceraForms from '../../CabeceraForms';
import { AlmacenProveedoresContext } from '../../../pages/AlmacenProveedores';

function BuscarProveedorForm() {
  const {
    ListarProveedoresPorDniCif,
    ListarProveedoresPorNombre,
  } = useContext(AlmacenProveedoresContext);
  const valorRef = useRef();

  const changeRadioGroup = useChangeRadioGroup('dni_cif');

  const handleSubmitForm = () => {
    switch (changeRadioGroup.value) {
      case 'dni_cif':
        ListarProveedoresPorDniCif(valorRef.current.value);
        break;
      case 'nombre':
        ListarProveedoresPorNombre(valorRef.current.value);
        break;
      default:
        break;
    }
  };

  const formik = useFormik({

    initialValues: {
      valor: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Buscar proveedor" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={changeRadioGroup.value}
              onChange={changeRadioGroup.handleChange}
            >
              <FormControlLabel value="dni_cif" control={<Radio />} label="dni / cif" />
              <FormControlLabel value="nombre" control={<Radio />} label="nombre" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="valor"
            name="valor"
            label="valor"
            size="small"
            value={formik.values.valor}
            onChange={formik.handleChange}
            error={formik.touched.valor && Boolean(formik.errors.valor)}
            helperText={formik.touched.valor && formik.errors.valor}
            inputRef={valorRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default BuscarProveedorForm;
