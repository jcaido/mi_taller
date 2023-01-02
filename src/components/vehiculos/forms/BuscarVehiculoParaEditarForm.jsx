import React, { useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const BuscarVehiculoParaEditarForm = () => {

    const { ObtenerVehiculoPorMatriculaParaEditar, CerrarFormEditarVehiculo } = useContext(DatosGeneralesFormContext);

    let matriculaRef = useRef();

    const handleSubmitForm = () => {
        ObtenerVehiculoPorMatriculaParaEditar(matriculaRef.current.value);
        formik.resetForm();
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
                    <Chip label='Editar vehiculo'/>
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="matricula"
                        name="matricula"
                        label="matricula"
                        size="small"
                        value={formik.values.matricula}
                        onChange={formik.handleChange}
                        onFocus={CerrarFormEditarVehiculo}
                        error={formik.touched.matricula && Boolean(formik.errors.matricula)}
                        helperText={formik.touched.matricula && formik.errors.matricula}
                        inputRef={matriculaRef}
                    />
                </Box>
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>                
            </form>
        </Box>
    )
}

export default BuscarVehiculoParaEditarForm
