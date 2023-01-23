import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';

const validationSchema = yup.object({
  fechaCierre: yup
    .date()
    .nullable()
    .required('La fecha de cierre es obligatoria'),
});

function CerrarOrdenForm() {
  const fechaCierreRef = useRef();

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

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmitForm = () => {
    // kkkk
  };

  const formik = useFormik({
    initialValues: {
      fechaCierre: value,
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaCierre"
                name="fechaCierre"
                label="fecha de cierre"
                inputFormat="DD-MM-YYYY"
                value={value}
                onChange={handleChange}
                error={formik.touched.fechaCierre && Boolean(formik.errors.fechaCierre)}
                helperText={formik.touched.fechaCierre && formik.errors.fechaCierre}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaCierreRef}
              />
            </Stack>
          </LocalizationProvider>
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

export default CerrarOrdenForm;
