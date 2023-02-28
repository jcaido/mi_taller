import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CabeceraForms from '../../CabeceraForms';
import useModal from '../../../hooks/useModal';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { nuevaEntradaPieza, obtenerPiezaPorReferencia } from '../../../services/axiosService';
import { AlmacenEntradasContext } from '../../../pages/AlmacenEntradas';

const validationSchema = yup.object({
  referenciaPieza: yup
    .string('Introduzca la referencia de la pieza')
    .required('La referencia de la pieza es obligatoria'),
  cantidad: yup
    .number('Introduzca la cantidad')
    .typeError('Introduzca un dato numerico')
    .required('La cantidad es obligatoria'),
  precio: yup
    .number('Introduzca el precio de compra de la pieza')
    .typeError('Introduzca un dato numerico')
    .required('El precio de compra es obligatorio'),
});

export default function NuevaEntradaPiezaForm({ albaran }) {
  const { ObtenerAlbaranPorIdParaActualizar } = useContext(AlmacenEntradasContext);

  const referenciaPiezaRef = useRef();
  const cantidadref = useRef();
  const precioRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    obtenerPiezaPorReferencia(referenciaPiezaRef.current.value)
      .then((response) => {
        nuevaEntradaPieza(
          cantidadref.current.value,
          precioRef.current.value,
          response.data.id,
          albaran.id,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
            ObtenerAlbaranPorIdParaActualizar(albaran.id);
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
      precio: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Nueva Entrada" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="referenciaPieza"
            name="referenciaPieza"
            label="Referencia pieza"
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
            inputRef={cantidadref}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="precio"
            name="precio"
            label="precio"
            size="small"
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
            inputRef={precioRef}
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
