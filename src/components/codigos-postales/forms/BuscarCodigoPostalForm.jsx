import React, { useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const BuscarCodigoPostalForm = () => {

    const { ListarCodigosPostalesPorCodigo, ListarCodigosPostalesPorLocalidad, ListarCodigosPostalesPorProvincia } = useContext(DatosGeneralesFormContext);

    let codigoRef = useRef();

    const [value, setValue] = useState('codigo');

    const handleChange = (e) => {
        setValue(e.target.value);
    };


    const handleSubmitForm = () => {
        value === 'codigo' && ListarCodigosPostalesPorCodigo(codigoRef.current.value);
        value === 'localidad' && ListarCodigosPostalesPorLocalidad(codigoRef.current.value);
        value === 'provincia' && ListarCodigosPostalesPorProvincia(codigoRef.current.value);
        formik.resetForm();
    }


    const formik = useFormik({

        initialValues: {
            valor: ''
        },
        onSubmit: () =>  handleSubmitForm (),
    })


    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Buscar codigo postal'/> 
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="codigo" control={<Radio />} label="codigo"/>
                            <FormControlLabel value="localidad" control={<Radio />} label="localidad"/>
                            <FormControlLabel value="provincia" control={<Radio />} label="provincia"/>
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box m = {1}>
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
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>
            </form>      
        </Box>
   )
}

export default BuscarCodigoPostalForm
