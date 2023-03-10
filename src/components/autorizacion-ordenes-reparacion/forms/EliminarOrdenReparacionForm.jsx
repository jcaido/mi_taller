import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';
import { eliminarOrdenReparacion } from '../../../services/axiosService';
import CabeceraForms from '../../CabeceraForms';
import useModal from '../../../hooks/useModal';

function EliminarOrdenReparacionForm() {
  const { state } = useContext(AutorizacionOrdenesContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    eliminarOrdenReparacion(state.listaOrdenReparacionPorId.id)
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      fechaApertura: state.listaOrdenReparacionPorId.fechaApertura,
      matricula: state.listaOrdenReparacionPorId.vehiculoMatricula,
      descripcion: state.listaOrdenReparacionPorId.descripcion,
      kilometros: state.listaOrdenReparacionPorId.kilometros,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Eliminar orden de reparacion" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="fechaApertura"
            name="fechaApertura"
            label="fecha de apertura"
            size="small"
            value={state.listaOrdenReparacionPorId.fechaApertura}
            onChange={formik.handleChange}
            error={formik.touched.fechaApertura && Boolean(formik.errors.fechaApertura)}
            helperText={formik.touched.fechaApertura && formik.errors.fechaApertura}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="matricula"
            name="matricula"
            label="matricula"
            size="small"
            value={state.listaOrdenReparacionPorId.vehiculoMatricula}
            onChange={formik.handleChange}
            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
            helperText={formik.touched.matricula && formik.errors.matricula}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="descripcion"
            name="descripcion"
            label="descripcion"
            size="small"
            value={state.listaOrdenReparacionPorId.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="kilometros"
            name="kilometros"
            label="kilometros"
            size="small"
            value={state.listaOrdenReparacionPorId.kilometros}
            onChange={formik.handleChange}
            error={formik.touched.kilometros && Boolean(formik.errors.kilometros)}
            helperText={formik.touched.kilometros && formik.errors.kilometros}
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

export default EliminarOrdenReparacionForm;
