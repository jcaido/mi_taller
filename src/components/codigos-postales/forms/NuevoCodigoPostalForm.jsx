import React, { useState, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { nuevoCodigoPostal } from '../axiosService';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import ModalErrores from '../../../utils/ModalErrores';
import ModalOK from '../../../utils/ModalOK';

const validationSchema = yup.object({
    codigo: yup
        .string('Introduzca el codigo')
        .required('El codigo es obligatorio'),
    localidad: yup
        .string('Introduzca la localidad')
        .required('La localidad es obligatoria'),
    provincia: yup
        .string('Introduzca la provincia')
        .required('La provincia es obligatoria')
});

const NuevoCodigoPostalForm = () => {

    const { ListarCodigosPostales } = useContext(DatosGeneralesFormContext);

    let codigoRef = useRef();
    let localidadRef = useRef();
    let provinciaRef = useRef();

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
        nuevoCodigoPostal(codigoRef.current.value, localidadRef.current.value, provinciaRef.current.value)
            .then((response) => {
                ListarCodigosPostales();
                formik.resetForm();
                handleOpen();
            })
            .catch((error) => {
                error.response.status === 409 && handleOpenError(error.response.data.mensaje);
                error.response.status === 400 && handleOpenError(error.response.data.codigo);
            })
    }

    const formik = useFormik({

        initialValues: {
            codigo: '',
            localidad: '',
            provincia: '',
        },
        validationSchema: validationSchema,
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Nuevo codigo postal'/> 
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit} >
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="codigo"
                        name="codigo"
                        label="Codigo"
                        size="small"
                        value={formik.values.codigo}
                        onChange={formik.handleChange}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                        inputRef={codigoRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="localidad"
                        name="localidad"
                        label="localidad"
                        size="small"
                        value={formik.values.localidad}
                        onChange={formik.handleChange}
                        error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                        helperText={formik.touched.localidad && formik.errors.localidad}
                        inputRef={localidadRef}                    
                    />
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="provincia"
                        name="provincia"
                        label="provincia"
                        size="small"
                        value={formik.values.provincia}
                        onChange={formik.handleChange}
                        error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                        helperText={formik.touched.provincia && formik.errors.provincia}
                        inputRef={provinciaRef}                    
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

export default NuevoCodigoPostalForm
 