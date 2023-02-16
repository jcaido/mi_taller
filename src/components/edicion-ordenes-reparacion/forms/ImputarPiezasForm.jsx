import React, { useContext, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { EdicionOrdenesContext } from '../../../pages/TallerEdicionOrdenes';
import { nuevaPiezaReparacion, obtenerPiezaPorReferencia } from '../../../services/axiosService';
import CabeceraForms from '../../CabeceraForms';
import useModal from '../../../hooks/useModal';

const validationSchema = yup.object({
  referenciaPieza: yup
    .string('Introduzca la referencia')
    .required('La referencia es obligatoria'),
  cantidad: yup
    .number('Introduzca la cantidad')
    .typeError('Introduzca un dato numerico')
    .required('La cantidad es obligatoria'),
});

function ImputarPiezasForm() {
  const { state, ObtenerOrdenReparacionPorIdParaActualizar } = useContext(EdicionOrdenesContext);

  const referenciaPiezaRef = useRef();
  const cantidadRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    obtenerPiezaPorReferencia(referenciaPiezaRef.current.value)
      .then((response) => {
        nuevaPiezaReparacion(
          state.ordenReparacionPorId.id,
          response.data.id,
          cantidadRef.current.value,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
            ObtenerOrdenReparacionPorIdParaActualizar(state.ordenReparacionPorId.id);
          })
          .catch((error) => error.response.status === 409
          && modal.handleOpenError(error.response.data.mensaje));
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      referenciaPieza: '',
      cantidad: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Imputar piezas" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="referenciaPieza"
            name="referenciaPieza"
            label="referencia"
            size="small"
            value={formik.values.referenciaPieza}
            onChange={formik.handleChange}
            error={formik.touched.referenciaPieza && Boolean(formik.errors.referenciaPieza)}
            helperText={formik.touched.referenciaPieza && formik.errors.referenciaPieza}
            inputRef={referenciaPiezaRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="cantidad"
            name="cantidad"
            label="cantidad"
            size="small"
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
            inputRef={cantidadRef}
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

export default ImputarPiezasForm;
