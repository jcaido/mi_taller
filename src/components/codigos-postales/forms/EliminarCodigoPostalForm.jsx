import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { eliminarCodigoPostal } from '../../../services/axiosService';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import ModalErrores from '../../../utils/ModalErrores';
import ModalOK from '../../../utils/ModalOK';

function EliminarCodigoPostalForm() {
  const { state } = useContext(DatosGeneralesFormContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openError, setOpenError] = useState(false);
  const [message, setMensaje] = useState('');
  const handleOpenError = (messag) => {
    setOpenError(true);
    setMensaje(messag);
  };
  const handleCloseError = () => setOpenError(false);

  const handleSubmitForm = () => {
    eliminarCodigoPostal(state.listaCodigosPostalesPorCodigo.id)
      .then(() => {
        formik.resetForm();
        handleOpen();
      })
      .catch((error) => error.response.status === 409
      && handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      codigo: state.listaCodigosPostalesPorCodigo.codigo,
      localidad: state.listaCodigosPostalesPorCodigo.localidad,
      provincia: state.listaCodigosPostalesPorCodigo.provincia,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (

    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="codigo"
            name="codigo"
            label="Codigo"
            value={state.listaCodigosPostalesPorCodigo.codigo}
            onChange={formik.handleChange}
            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
            helperText={formik.touched.codigo && formik.errors.codigo}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="localidad"
            name="localidad"
            label="localidad"
            value={state.listaCodigosPostalesPorCodigo.localidad}
            onChange={formik.handleChange}
            error={formik.touched.localidad && Boolean(formik.errors.localidad)}
            helperText={formik.touched.localidad && formik.errors.localidad}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="provincia"
            name="provincia"
            label="provincia"
            value={state.listaCodigosPostalesPorCodigo.provincia}
            onChange={formik.handleChange}
            error={formik.touched.provincia && Boolean(formik.errors.provincia)}
            helperText={formik.touched.provincia && formik.errors.provincia}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
        <ModalOK open={open} handleClose={handleClose} />
        <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError} />
      </form>
    </Box>

  );
}

export default EliminarCodigoPostalForm;
