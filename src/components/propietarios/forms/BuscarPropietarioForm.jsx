import React, { useState, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const BuscarPropietarioForm = () => {

    const { ListarPropietariosPorDni, ListarPropietariosPorPrimerApellido, ListarPropietariosPorCodigoPostal } = useContext(DatosGeneralesFormContext);

    let valorRef = useRef();

    const [value, setValue] = useState('dni');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmitForm = () => {
        value === 'dni' && ListarPropietariosPorDni(valorRef.current.value);
        value === 'primer_apellido' && ListarPropietariosPorPrimerApellido(valorRef.current.value);
        value === 'codigo_postal' && ListarPropietariosPorCodigoPostal(valorRef.current.value);
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
                    <Chip label='Buscar propietarios'/> 
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
                            <FormControlLabel value="dni" control={<Radio />} label="DNI"/>
                            <FormControlLabel value="primer_apellido" control={<Radio />} label="primer apellido"/>
                            <FormControlLabel value="codigo_postal" control={<Radio />} label="codigo postal"/> 
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
                        inputRef={valorRef}
                    />
                </Box>
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>
            </form>
        </Box>
    )
}

export default BuscarPropietarioForm
