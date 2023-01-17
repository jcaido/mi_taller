import React, { useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

function BuscarVehiculoForm() {
  const {
    ListarVehiculosPorMatricula,
    ListarVehiculosPorMarcaModelo,
    ListarVehiculosPorDniPropietario,
  } = useContext(DatosGeneralesFormContext);

  const valorRef = useRef();

  const [value, setValue] = useState('matricula');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitForm = () => {
    switch (value) {
      case 'matricula':
        ListarVehiculosPorMatricula(valorRef.current.value);
        break;
      case 'marca-modelo':
        ListarVehiculosPorMarcaModelo(valorRef.current.value);
        break;
      case 'propietario':
        ListarVehiculosPorDniPropietario(valorRef.current.value);
        break;
      default:
        break;
    }
    // value === 'matricula' && ListarVehiculosPorMatricula(valorRef.current.value);
    // value === 'marca-modelo' && ListarVehiculosPorMarcaModelo(valorRef.current.value);
    // value === 'propietario' && ListarVehiculosPorDniPropietario(valorRef.current.value);
  };

  const formik = useFormik({

    initialValues: {
      valor: '',
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <Box>
        <Divider>
          <Chip label="Buscar vehiculos" />
        </Divider>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="matricula" control={<Radio />} label="matricula" />
              <FormControlLabel value="marca-modelo" control={<Radio />} label="marca-modelo" />
              <FormControlLabel value="propietario" control={<Radio />} label="propietario (DNI)" />
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

export default BuscarVehiculoForm;
