import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useModal from '../../../hooks/useModal';
import { AlmacenEntradasContext } from '../../../pages/AlmacenEntradas';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { eliminarAlbaranEntradas } from '../../../services/axiosService';

export default function EliminarAlbaranForm() {
  const { state } = useContext(AlmacenEntradasContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    eliminarAlbaranEntradas(state.listaAlbaranesEntrada.id)
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      fechaAlbaran: state.listaAlbaranesEntrada.fechaAlbaran,
      numeroAlbaran: state.listaAlbaranesEntrada.numeroAlbaran,
      proveedor: state.listaAlbaranesEntrada.proveedor.dniCif,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '60%' }}
            id="fechaAlbaran"
            name="fechaAlbaran"
            label="fecha albaran"
            size="small"
            value={state.listaAlbaranesEntrada.fechaAlbaran}
            onChange={formik.handleChange}
            error={formik.touched.fechaAlbaran && Boolean(formik.errors.fechaAlbaran)}
            helperText={formik.touched.fechaAlbaran && formik.errors.fechaAlbaran}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '60%' }}
            id="numeroAlbaran"
            name="numeroAlbaran"
            label="numero albaran"
            size="small"
            value={state.listaAlbaranesEntrada.numeroAlbaran}
            onChange={formik.handleChange}
            error={formik.touched.numeroAlbaran && Boolean(formik.errors.numeroAlbaran)}
            helperText={formik.touched.numeroAlbaran && formik.errors.numeroAlbaran}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '60%' }}
            id="proveedor"
            name="proveedor"
            label="proveedor"
            size="small"
            value={state.listaAlbaranesEntrada.proveedor.dniCif}
            onChange={formik.handleChange}
            error={formik.touched.proveedor && Boolean(formik.errors.proveedor)}
            helperText={formik.touched.proveedor && formik.errors.proveedor}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" sx={{ width: '60%' }}>Aceptar</Button>
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
