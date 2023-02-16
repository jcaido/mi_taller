import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import { modificarVehiculo, obtenerPropietarioPorDni } from '../../../services/axiosService';
import useModal from '../../../hooks/useModal';

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
    .required('El propietario es obligatorio'),
});

function EditarVehiculoForm() {
  const { state } = useContext(DatosGeneralesFormContext);

  const matriculaRef = useRef();
  const marcaRef = useRef();
  const modeloRef = useRef();
  const colorRef = useRef();
  const propietarioRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    obtenerPropietarioPorDni(propietarioRef.current.value)
      .then((response) => {
        modificarVehiculo(
          state.listaVehiculosPorMatricula.id,
          matriculaRef.current.value,
          marcaRef.current.value,
          modeloRef.current.value,
          colorRef.current.value,
          response.data.id,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
          })
          .catch((error) => (error.response.status === 409 || error.response.status === 400)
          && modal.handleOpenError(error.response.data.mensaje));
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      matricula: state.listaVehiculosPorMatricula.matricula,
      marca: state.listaVehiculosPorMatricula.marca,
      modelo: state.listaVehiculosPorMatricula.modelo,
      color: state.listaVehiculosPorMatricula.color,
      propietario: state.listaVehiculosPorMatricula.propietario.dni,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
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
        <Box m={1}>
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
        <Box m={1}>
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
        <Box m={1}>
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
        <Box m={1}>
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
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
        <ModalOK open={modal.open} handleClose={modal.handleClose} />
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </form>
    </Box>
  );
}

export default EditarVehiculoForm;
