import React, { useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Box  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const BuscarPropietarioParaEditarForm = () => {

    const { ObtenerPropietarioPorDniParaEditar, CerrarFormEditarPropietario } = useContext(DatosGeneralesFormContext);

    let dniRef = useRef();

    const handleSubmitForm = () => {
        ObtenerPropietarioPorDniParaEditar(dniRef.current.value);
        formik.resetForm();
    }

    const formik = useFormik({

        initialValues: {
            dni: ''
        },
        onSubmit: () =>  handleSubmitForm (),
    })

    return (
        <Box m= {2}>
            <Box>
                <Divider>
                    <Chip label='Editar propietario'/>
                </Divider>
            </Box>
            <form onSubmit = { formik.handleSubmit}>
                <Box m = {1}>
                    <TextField
                        fullWidth
                        id="dni"
                        name="dni"
                        label="dni"
                        size="small"
                        value={formik.values.dni}
                        onChange={formik.handleChange}
                        onFocus={CerrarFormEditarPropietario}
                        error={formik.touched.dni && Boolean(formik.errors.dni)}
                        helperText={formik.touched.dni && formik.errors.dni}
                        inputRef={dniRef}
                    />
                </Box>
                <Box m = {1}>
                    <Button type = 'submit' color = 'primary' variant = 'contained' fullWidth>Aceptar</Button>
                </Box>
            </form>
        </Box>
    )
}

export default BuscarPropietarioParaEditarForm
