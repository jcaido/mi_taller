import React, { useContext, useRef, useState } from 'react';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const BuscarOrdenReparacionForm = () => {

    const { ListarOrdenesReparacionAbiertasPorFechaApertura, ListarOrdenesReparacionAbiertasPorVehiculo } = useContext(AutorizacionOrdenesContext);

    let matriculaRef = useRef();
    let fechaAperturaRef = useRef();

    const [value, setValue] = useState('fecha-apertura');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const [valueFechaApertura, setValueFechaApertura] = useState(new Date());

    const handleChangeFechaApertura = (newValue) => {
        setValueFechaApertura(newValue);
    };    

    const handleSubmitForm = () => {
        value === 'fecha-apertura' && ListarOrdenesReparacionAbiertasPorFechaApertura(fechaAperturaRef.current.value)
        value === 'vehiculo' && ListarOrdenesReparacionAbiertasPorVehiculo(matriculaRef.current.value)
    }

    const formik = useFormik({

        initialValues: {
            matricula: ''
        },
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Buscar orden de reparacion'/> 
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
                            <FormControlLabel value="fecha-apertura" control={<Radio />} label="fecha apertura"/>
                            <FormControlLabel value="vehiculo" control={<Radio />} label="vehiculo(matricula)"/>
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box m = {1}>
                    { 
                        value === "fecha-apertura" && 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    id="fechaApertura"
                                    name="fechaApertura"     
                                    label="fecha de apertura"
                                    inputFormat="YYYY-MM-DD"
                                    value={ valueFechaApertura }
                                    onChange={ handleChangeFechaApertura }
                                    error={formik.touched.fechaApertura && Boolean(formik.errors.fechaApertura)}
                                    helperText={formik.touched.fechaApertura && formik.errors.fechaApertura}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputRef={fechaAperturaRef}
                                />
                            </Stack>
                        </LocalizationProvider>                         
                    }
                    { 
                        value === "vehiculo" &&
                        <TextField
                            fullWidth
                            id="matricula"
                            name="matricula"
                            label="matricula"
                            size="small"
                            value={formik.values.matricula}
                            onChange={formik.handleChange}
                            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
                            helperText={formik.touched.valor && formik.errors.valor}
                            inputRef={matriculaRef}
                        />
                    }                                         
                </Box>
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>                
            </form>
        </Box>        
    )
}

export default BuscarOrdenReparacionForm
