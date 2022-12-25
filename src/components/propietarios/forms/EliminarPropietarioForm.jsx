import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { eliminarPropietario } from '../../codigos-postales/axiosService';

const EliminarPropietarioForm = () => {

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
        eliminarPropietario(state.listaPropietariosPorDni.id)
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
            nombre: state.listaPropietariosPorDni.nombre,
            primerApellido: state.listaPropietariosPorDni.primerApellido,
            segundoApellido: state.listaPropietariosPorDni.segundoApellido,
            dni: state.listaPropietariosPorDni.dni,
            domicilio: state.listaPropietariosPorDni.domicilio,
            codigoPostal: state.listaPropietariosPorDni.codigoPostal.codigo,
        },
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <form onSubmit = { formik.handleSubmit} >
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="nombre"
                        name="nombre"
                        label="nombre"
                        size="small"
                        value={state.listaPropietariosPorDni.nombre}
                        onChange={formik.handleChange}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="primerApellido"
                        name="primerApellido"
                        label="primer apellido"
                        size="small"
                        value={state.listaPropietariosPorDni.primerApellido}
                        onChange={formik.handleChange}
                        error={formik.touched.primerApellido && Boolean(formik.errors.primerApellido)}
                        helperText={formik.touched.primerApellido && formik.errors.primerApellido}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="segundoApellido"
                        name="segundoApellido"
                        label="segundo apellido"
                        size="small"
                        value={state.listaPropietariosPorDni.segundoApellido}
                        onChange={formik.handleChange}
                        error={formik.touched.segundoApellido && Boolean(formik.errors.segundoApellido)}
                        helperText={formik.touched.segundoApellido && formik.errors.segundoApellido}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="dni"
                        name="dni"
                        label="DNI"
                        size="small"
                        value={state.listaPropietariosPorDni.dni}
                        onChange={formik.handleChange}
                        error={formik.touched.dni && Boolean(formik.errors.dni)}
                        helperText={formik.touched.dni && formik.errors.dni}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="domicilio"
                        name="domicilio"
                        label="domicilio"
                        size="small"
                        value={state.listaPropietariosPorDni.domicilio}
                        onChange={formik.handleChange}
                        error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
                        helperText={formik.touched.domicilio && formik.errors.domicilio}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        disabled
                        fullWidth
                        id="codigoPostal"
                        name="codigoPostal"
                        label="codigo postal"
                        size="small"
                        value={state.listaPropietariosPorDni.codigoPostal.codigo}
                        onChange={formik.handleChange}
                        error={formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal)}
                        helperText={formik.touched.codigoPostal && formik.errors.codigoPostal}
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

export default EliminarPropietarioForm
