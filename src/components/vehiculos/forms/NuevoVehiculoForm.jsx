import React, { useState, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { nuevoVehiculo, obtenerPropietarioPorDni } from '../../codigos-postales/axiosService';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const validationSchema = yup.object({
    matricula: yup
        .string('Introduzca la matriculoa')
        .required('La matricula es obligatoria'),
    marca: yup
        .string('Introduzca la marca')
        .required('La marca es obligatoria'),
    modelo: yup
        .string('Introduzca el modelo')
        .required('el modelo es obligatorio'),
    color: yup
        .string('Introduzca el color')
        .required('el color es obligatorio'),
    propietario: yup
        .string('Introduzca el propietario')
        .required('El propietario es obligatorio')
});

const NuevoVehiculoForm = () => {

    const { ListarVehiculos } = useContext(DatosGeneralesFormContext);

    let matriculaRef = useRef();
    let marcaRef = useRef();
    let modeloRef = useRef();
    let colorRef = useRef();
    let propietarioRef = useRef();

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
        obtenerPropietarioPorDni(propietarioRef.current.value)
            .then((response) => {
                nuevoVehiculo(matriculaRef.current.value, marcaRef.current.value, modeloRef.current.value, colorRef.current.value, response.data.id)
                    .then((response) => {
                        formik.resetForm();
                        handleOpen();
                        ListarVehiculos();
                    })
                    .catch((error) => {
                        error.response.status === 409 && handleOpenError(error.response.data.mensaje);
                    })
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const formik = useFormik({

        initialValues: {
            matricula: '',
            marca: '',
            modelo: '',
            color: '',
            propietario: ''
        },
        validationSchema: validationSchema,
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Nuevo vehiculo'/>
                </Divider>
            </Box>
            <form  onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="matricula"
                        name="matricula"
                        label="matricula"
                        size="small"
                        value={formik.values.matricula}
                        onChange={formik.handleChange}
                        error={formik.touched.matricula && Boolean(formik.errors.matricula)}
                        helperText={formik.touched.matricula && formik.errors.matricula}
                        inputRef={matriculaRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="marca"
                        name="marca"
                        label="marca"
                        size="small"
                        value={formik.values.marca}
                        onChange={formik.handleChange}
                        error={formik.touched.marca && Boolean(formik.errors.marca)}
                        helperText={formik.touched.marca && formik.errors.marca}
                        inputRef={marcaRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="modelo"
                        name="modelo"
                        label="modelo"
                        size="small"
                        value={formik.values.modelo}
                        onChange={formik.handleChange}
                        error={formik.touched.modelo && Boolean(formik.errors.modelo)}
                        helperText={formik.touched.modelo && formik.errors.modelo}
                        inputRef={modeloRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="color"
                        name="color"
                        label="color"
                        size="small"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
                        inputRef={colorRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="propietario"
                        name="propietario"
                        label="propietario"
                        size="small"
                        value={formik.values.propietario}
                        onChange={formik.handleChange}
                        error={formik.touched.propietario && Boolean(formik.errors.propietario)}
                        helperText={formik.touched.propietario && formik.errors.propietario}
                        inputRef={propietarioRef}
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

export default NuevoVehiculoForm
