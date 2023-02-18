import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import CabeceraForms from '../../CabeceraForms';
import useChangeRadioGroup from '../../../hooks/useChangeRadioGroup';

function BuscarCodigoPostalForm() {
  const
    {
      ListarCodigosPostalesPorCodigo,
      ListarCodigosPostalesPorLocalidad,
      ListarCodigosPostalesPorProvincia,
    } = useContext(DatosGeneralesFormContext);

  const codigoRef = useRef();

  const changeRadioGroup = useChangeRadioGroup('codigo');

  const handleSubmitForm = () => {
    switch (changeRadioGroup.value) {
      case 'codigo':
        ListarCodigosPostalesPorCodigo(codigoRef.current.value);
        break;
      case 'localidad':
        ListarCodigosPostalesPorLocalidad(codigoRef.current.value);
        break;
      case 'provincia':
        ListarCodigosPostalesPorProvincia(codigoRef.current.value);
        break;
      default:
        break;
    }
    formik.resetForm();
  };

  const formik = useFormik({

    initialValues: {
      valor: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Buscar codigo postal" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={changeRadioGroup.value}
              onChange={changeRadioGroup.handleChange}
            >
              <FormControlLabel value="codigo" control={<Radio />} label="codigo" />
              <FormControlLabel value="localidad" control={<Radio />} label="localidad" />
              <FormControlLabel value="provincia" control={<Radio />} label="provincia" />
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

export default BuscarCodigoPostalForm;
