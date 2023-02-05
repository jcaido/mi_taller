import React, { useContext, useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import { EdicionOrdenesContext } from '../../../pages/TallerEdicionOrdenes';

const validationSchema = yup.object({
  horas: yup
    .number('Introduzca el precio/hora de la mano de obra')
    .typeError('Introduzca un dato numerico')
    .required('El precio/hora es obligatorio'),
});

function EstablecerPrecioManoDeObraForm() {
  // eslint-disable-next-line no-unused-vars
  const { state } = useContext(EdicionOrdenesContext);

  const PrecioManoDeObraRef = useRef();

  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitForm = () => {
    //
  };

  const formik = useFormik({
    initialValues: {
      precio: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <Box>
        <Divider>
          <Chip label="Precio/hora mano de obra" />
        </Divider>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="precio"
            name="precio"
            label="precio/hora"
            size="small"
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
            inputRef={PrecioManoDeObraRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
        </Box>
        <ModalOK open={open} handleClose={handleClose} />
      </form>
    </Box>
  );
}

export default EstablecerPrecioManoDeObraForm;
