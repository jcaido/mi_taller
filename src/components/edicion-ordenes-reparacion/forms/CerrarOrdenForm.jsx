import React, { useContext, useState, useRef } from 'react';
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
import { EdicionOrdenesContext } from '../../../pages/TallerEdicionOrdenes';
import { modificarOrdenReparacionCierre } from '../../../services/axiosService';

const validationSchema = yup.object({
  fechaCierre: yup
    .date()
    .nullable()
    .required('La fecha de cierre es obligatoria'),
});

function CerrarOrdenForm() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaActualizar,
    abrirOrdenReparacionFormDispatch,
  } = useContext(EdicionOrdenesContext);

  const fechaCierreRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmitForm = () => {
    modificarOrdenReparacionCierre(state.ordenReparacionPorId.id, fechaCierreRef.current.value)
      .then(() => {
        formik.resetForm();
        handleOpen();
        ObtenerOrdenReparacionPorIdParaActualizar(state.ordenReparacionPorId.id);
        abrirOrdenReparacionFormDispatch();
      });
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
          <Chip label="Cerrar orden de reparación" />
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
          <Button type="submit" color="primary" variant="contained" fullWidth>Cerrar</Button>
        </Box>
        <ModalOK open={open} handleClose={handleClose} />
      </form>
    </Box>
  );
}

export default CerrarOrdenForm;