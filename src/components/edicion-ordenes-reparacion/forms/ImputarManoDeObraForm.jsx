import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';

const validationSchema = yup.object({
  horas: yup
    .number('Introduzca el tiempo invertido en horas')
    .typeError('Introduzca un dato numerico')
    .required('El tiempo invertido es obligatorio'),
});

function ImputarManoDeObraForm() {
  const horasRef = useRef();

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [openError, setOpenError] = useState(false);
  // const [message, setMessage] = useState('');
  //  const handleOpenError = (messag) => {
  //  setOpenError(true);
  //  setMessage(messag);
  // };
  // const handleCloseError = () => setOpenError(false);

  const handleSubmitForm = () => {
    // kkkk
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
      <Box>
        <Divider>
          <Chip label="Imputar Mano de Obra" />
        </Divider>
      </Box>
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
        <ModalOK open={open} handleClose={handleClose} />
        <ModalErrores />
      </form>
    </Box>
  );
}

export default ImputarManoDeObraForm;
