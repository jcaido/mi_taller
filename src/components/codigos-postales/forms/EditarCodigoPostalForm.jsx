import React, { useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { modificarCodigoPostal } from '../../../services/axiosService';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import ModalErrores from '../../../utils/ModalErrores';
import ModalOK from '../../../utils/ModalOK';
import useModal from '../../../hooks/useModal';

const validationSchema = yup.object({
  codigo: yup
    .string('Introduzca el codigo')
    .required('El codigo es obligatorio'),
  localidad: yup
    .string('Introduzca la localidad')
    .required('La localidad es obligatoria'),
  provincia: yup
    .string('Introduzca la provincia')
    .required('La provincia es obligatoria'),
});

function EditarCodigoPostalForm() {
  const { state } = useContext(DatosGeneralesFormContext);

  const codigoRef = useRef();
  const localidadRef = useRef();
  const provinciaRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    modificarCodigoPostal(
      state.listaCodigosPostalesPorCodigo.id,
      codigoRef.current.value,
      localidadRef.current.value,
      provinciaRef.current.value,
    )
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
      })
      .catch((error) => (error.response.status === 409 || error.response.status === 400)
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      codigo: state.listaCodigosPostalesPorCodigo.codigo,
      localidad: state.listaCodigosPostalesPorCodigo.localidad,
      provincia: state.listaCodigosPostalesPorCodigo.provincia,
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
            id="codigo"
            name="codigo"
            label="codigo"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
            helperText={formik.touched.codigo && formik.errors.codigo}
            inputRef={codigoRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="localidad"
            name="localidad"
            label="localidad"
            value={formik.values.localidad}
            onChange={formik.handleChange}
            error={formik.touched.localidad && Boolean(formik.errors.localidad)}
            helperText={formik.touched.localidad && formik.errors.localidad}
            inputRef={localidadRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="provincia"
            name="provincia"
            label="provincia"
            value={formik.values.provincia}
            onChange={formik.handleChange}
            error={formik.touched.provincia && Boolean(formik.errors.provincia)}
            helperText={formik.touched.provincia && formik.errors.provincia}
            inputRef={provinciaRef}
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

export default EditarCodigoPostalForm;
