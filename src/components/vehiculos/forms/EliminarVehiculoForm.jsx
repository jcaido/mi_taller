import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import { eliminarVehiculo } from '../../codigos-postales/axiosService';

const EliminarVehiculoForm = () => {

    const { state } = useContext(DatosGeneralesFormContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openError, setOpenError] = useState(false);
    const [message, setMensaje] = useState('');
    const handleOpenError = (messag) => {
        setOpenError(true);
        setMensaje(messag);
    }
    const handleCloseError = () => setOpenError(false)

    const handleSubmitForm = () => {
        eliminarVehiculo(state.listaVehiculosPorMatricula.id)
            .then((response) => {
                formik.resetForm();
                handleOpen();
            })
            .catch((error) => {
                error.response.status === 409 && handleOpenError(error.response.data.mensaje);
            })
    }

    const formik = useFormik({

        initialValues: {
            matricula: state.listaVehiculosPorMatricula.matricula,
            marca: state.listaVehiculosPorMatricula.marca,
            modelo: state.listaVehiculosPorMatricula.modelo,
            color: state.listaVehiculosPorMatricula.color,
            propietario: state.listaVehiculosPorMatricula.propietario.dni
        },
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <form onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="matricula"
                        name="matricula"
                        label="matricula"
                        size="small"
                        value={state.listaVehiculosPorMatricula.matricula}
                        onChange={formik.handleChange}
                        error={formik.touched.matricula && Boolean(formik.errors.matricula)}
                        helperText={formik.touched.matricula && formik.errors.matricula}
                    />
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="marca"
                        name="marca"
                        label="marca"
                        size="small"
                        value={state.listaVehiculosPorMatricula.marca}
                        onChange={formik.handleChange}
                        error={formik.touched.marca && Boolean(formik.errors.marca)}
                        helperText={formik.touched.marca && formik.errors.marca}
                    />
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="modelo"
                        name="modelo"
                        label="modelo"
                        size="small"
                        value={state.listaVehiculosPorMatricula.modelo}
                        onChange={formik.handleChange}
                        error={formik.touched.modelo && Boolean(formik.errors.modelo)}
                        helperText={formik.touched.modelo && formik.errors.modelo}
                    /> 
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="color"
                        name="color"
                        label="color"
                        size="small"
                        value={state.listaVehiculosPorMatricula.color}
                        onChange={formik.handleChange}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
                    />
                </Box>                     
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="propietario"
                        name="propietario"
                        label="propietario"
                        size="small"
                        value={state.listaVehiculosPorMatricula.propietario.dni}
                        onChange={formik.handleChange}
                        error={formik.touched.propietario && Boolean(formik.errors.propietario)}
                        helperText={formik.touched.propietario && formik.errors.propietario}
                    /> 
                </Box>    
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>
                <ModalOK open={open} handleClose={handleClose}></ModalOK>
                <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError}></ModalErrores>                                                              
            </form>
        </Box>
    )
}

export default EliminarVehiculoForm
