import React, { useState, useRef, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { nuevaOrdenReparacion, obtenerVehiculosPorMatricula } from '../../../services/axiosService';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';

const validationSchema = yup.object({
    fechaApertura: yup
        .date()
        .nullable()
        .required('La fecha de apertura es obligatoria'),
    matricula: yup
        .string('Introduzca la matricula')
        .required('La matricula es obligatoria'),
    descripcion: yup
        .string('Introduzca la descripcion del trabajo a realizar')
        .required('La descripcion es obligatoria'),
    kilometros: yup
        .number('Introduzca los kilometros del vehiculo')
        .typeError('Introduzca un dato numerico')
        .required('Los kilometros son obligatorios')
});


const NuevaOrdenReparacionForm = () => {

    const { ListarOrdenesReparacionAbiertas } = useContext(AutorizacionOrdenesContext);

    let fechaAperturaRef = useRef();
    let matriculaRef = useRef();
    let descripcionRef = useRef();
    let kilometrosRef = useRef();

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

    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSubmitForm = () => {
        obtenerVehiculosPorMatricula(matriculaRef.current.value)
            .then((response) => {
                nuevaOrdenReparacion(fechaAperturaRef.current.value, descripcionRef.current.value, kilometrosRef.current.value, 3)
                    .then((response) => {
                        formik.resetForm();
                        handleOpen();
                        ListarOrdenesReparacionAbiertas();
                    })
                    .catch((error)=> {
                        error.response.status === 400 && error.response.data.fechaApertura === 'la fecha de apertura no puede ser nula' && handleOpenError(error.response.data.fechaApertura)
                        error.response.status === 400 && error.response.data.descripcion === 'debe introducir la descripcion' && handleOpenError(error.response.data.descripcion)
                        error.response.status === 409 && handleOpenError(error.response.data.mensaje);
                    })
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })

    }

    const formik = useFormik({
        initialValues: {
            fechaApertura: value,
            matricula: '',
            descripcion: '',
            kilometros: ''
        },
        validationSchema: validationSchema,
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Nueva orden de reparacion'/> 
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit }>
                <Box m = {1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                id="fechaApertura"
                                name="fechaApertura"     
                                label="fecha de apertura"
                                inputFormat="DD-MM-YYYY"
                                value={ value }
                                onChange={ handleChange }
                                error={formik.touched.fechaApertura && Boolean(formik.errors.fechaApertura)}
                                helperText={formik.touched.fechaApertura && formik.errors.fechaApertura}
                                renderInput={(params) => <TextField {...params} />}
                                inputRef={fechaAperturaRef}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Box>
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
                        id="descripcion"
                        name="descripcion"
                        label="descripcion"
                        size="small"
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                        helperText={formik.touched.descripcion && formik.errors.descripcion}
                        inputRef={descripcionRef}
                    />                    
                </Box>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="kilometros"
                        name="kilometros"
                        label="kilometros"
                        size="small"
                        value={formik.values.kilometros}
                        onChange={formik.handleChange}
                        error={formik.touched.kilometros && Boolean(formik.errors.kilometros)}
                        helperText={formik.touched.kilometros && formik.errors.kilometros}
                        inputRef={kilometrosRef}
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

export default NuevaOrdenReparacionForm