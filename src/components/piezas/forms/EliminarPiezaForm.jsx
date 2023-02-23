import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AlmacenPiezassContext } from '../../../pages/AlmacenPiezas';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import useModal from '../../../hooks/useModal';
import { eliminarPieza } from '../../../services/axiosService';

export default function EliminarPiezaForm() {
  const { state } = useContext(AlmacenPiezassContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    eliminarPieza(state.listaPiezas.id)
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      referencia: state.listaPiezas.referencia,
      nombre: state.listaPiezas.nombre,
      precio: state.listaPiezas.precio,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="referencia"
            name="referencia"
            label="referencia"
            size="small"
            value={state.listaPiezas.referencia}
            onChange={formik.handleChange}
            error={formik.touched.referencia && Boolean(formik.errors.referencia)}
            helperText={formik.touched.referencia && formik.errors.referencia}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="nombre"
            name="nombre"
            label="nombre"
            size="small"
            value={state.listaPiezas.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="precio"
            name="precio"
            label="precio"
            size="small"
            value={state.listaPiezas.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
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
