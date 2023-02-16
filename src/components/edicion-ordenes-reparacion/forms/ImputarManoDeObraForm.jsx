import React, { useContext, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import { EdicionOrdenesContext } from '../../../pages/TallerEdicionOrdenes';
import { modificarOrdenReparacionHoras } from '../../../services/axiosService';
import CabeceraForms from '../../CabeceraForms';
import useModal from '../../../hooks/useModal';

const validationSchema = yup.object({
  horas: yup
    .number('Introduzca el tiempo invertido en horas')
    .typeError('Introduzca un dato numerico')
    .required('El tiempo invertido es obligatorio'),
});

function ImputarManoDeObraForm() {
  const { state, ObtenerOrdenReparacionPorIdParaActualizar } = useContext(EdicionOrdenesContext);

  const horasRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    modificarOrdenReparacionHoras(state.ordenReparacionPorId.id, horasRef.current.value)
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
        ObtenerOrdenReparacionPorIdParaActualizar(state.ordenReparacionPorId.id);
      });
  };

  const formik = useFormik({
    initialValues: {
      horas: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Imputar Mano de Obra" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="horas"
            name="horas"
            label="horas"
            size="small"
            value={formik.values.horas}
            onChange={formik.handleChange}
            error={formik.touched.horas && Boolean(formik.errors.horas)}
            helperText={formik.touched.horas && formik.errors.horas}
            inputRef={horasRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
        <ModalOK open={modal.open} handleClose={modal.handleClose} />
      </form>
    </Box>
  );
}

export default ImputarManoDeObraForm;
