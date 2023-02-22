import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useModal from '../../../hooks/useModal';
import { AlmacenPiezassContext } from '../../../pages/AlmacenPiezas';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { modificarPieza } from '../../../services/axiosService';

const validationSchema = yup.object({
  referencia: yup
    .string('Introduzca el nombre')
    .required('El nombre es obligatorio'),
  nombre: yup
    .string('Introduzca el DNI/CIF')
    .required('el DNI/CIF es obligatorio'),
  precio: yup
    .number('Introduzca el precio de venta de la pieza')
    .typeError('Introduzca un dato numerico')
    .required('El precio es obligatorio'),
});

export default function EditarPiezaForm() {
  const { state } = useContext(AlmacenPiezassContext);

  const referenciaRef = useRef();
  const nombreRef = useRef();
  const precioRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    modificarPieza(
      state.listaPiezas.id,
      referenciaRef.current.value,
      nombreRef.current.value,
      precioRef.current.value,
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
      referencia: state.listaPiezas.referencia,
      nombre: state.listaPiezas.nombre,
      precio: state.listaPiezas.precio,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            sx={{ width: '40%' }}
            id="referencia"
            name="referencia"
            label="referencia"
            size="small"
            value={formik.values.referencia}
            onChange={formik.handleChange}
            error={formik.touched.referencia && Boolean(formik.errors.referencia)}
            helperText={formik.touched.referencia && formik.errors.referencia}
            inputRef={referenciaRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            sx={{ width: '40%' }}
            id="nombre"
            name="nombre"
            label="nombre"
            size="small"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            inputRef={nombreRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            sx={{ width: '40%' }}
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
          <Button type="submit" color="primary" variant="contained" sx={{ width: '40%' }}>Aceptar</Button>
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
