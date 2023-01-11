import React, { useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';

const BuscarOrdenReparacionParaEditarForm = () => {

    //const { ObtenerVehiculoPorMatriculaParaEditar, CerrarFormEditarVehiculo } = useContext(AutorizacionOrdenesContext);
    const { ObtenerOrdenReparacionPorIdParaEditar, CerrarFormEditarOrdenReparacion } = useContext(AutorizacionOrdenesContext);

    let idRef = useRef();

    const handleSubmitForm = () => {
        ObtenerOrdenReparacionPorIdParaEditar(idRef.current.value)
        formik.resetForm();
    }

    const formik = useFormik({

        initialValues: {
            id: ''
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
                    <TextField
                        fullWidth
                        id="id"
                        name="id"
                        label="referencia(id)"
                        size="small"
                        value={formik.values.id}
                        onChange={formik.handleChange}
                        onFocus={CerrarFormEditarOrdenReparacion}
                        error={formik.touched.id && Boolean(formik.errors.id)}
                        helperText={formik.touched.id && formik.errors.id}
                        inputRef={idRef}
                    />
                </Box>
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>                
            </form>
        </Box>
    )
}

export default BuscarOrdenReparacionParaEditarForm
