import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const BuscarCodigoPostalParaEliminarForm = () => {

    const { ObtenerCodigoPostalPorCodigoParaEliminar } = useContext(DatosGeneralesFormContext);

    let codigoRef = useRef();

    const handleSubmitForm = () => {
        ObtenerCodigoPostalPorCodigoParaEliminar(codigoRef.current.value);
        formik.resetForm();
    }


    const formik = useFormik({

        initialValues: {
            codigo: ''
        },
        onSubmit: () =>  handleSubmitForm (),
    })


    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Eliminar codigo postal'/> 
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="codigo"
                        name="codigo"
                        label="codigo"
                        size="small"
                        value={formik.values.codigo}
                        onChange={formik.handleChange}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        helperText={formik.touched.codigo && formik.errors.codigo}
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

export default BuscarCodigoPostalParaEliminarForm
