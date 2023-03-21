import React, { useContext, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AlmacenEntradasContext } from '../../../pages/AlmacenEntradas';
import useChangeFecha from '../../../hooks/useChangeFecha';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import useModal from '../../../hooks/useModal';
import { modificarAlbaranEntradas, obtenerProveedorPorDniCif } from '../../../services/axiosService';

const validationSchema = yup.object({
  fechaAlbaran: yup
    .date()
    .nullable()
    .required('La fecha del albarán es obligatoria'),
  numeroAlbaran: yup
    .string('Introduzca el número del albarán')
    .required('El número del albarán es obligatorio'),
  proveedor: yup
    .string('Introduzca la referencia (id) del proveedor')
    .required('El proveedor es obligatorio'),
});

export default function EditarAlbaranForm() {
  const { state } = useContext(AlmacenEntradasContext);

  const fechaAlbaranRef = useRef();
  const numeroAlbaranRef = useRef();
  const proveedorRef = useRef();

  const modal = useModal();

  const fecha = state.listaAlbaranesEntrada.fechaAlbaran.split('-');

  const changeFecha = useChangeFecha(`${fecha[1]}-${fecha[0]}-${fecha[2]}`);

  const handleSubmitForm = () => {
    obtenerProveedorPorDniCif(proveedorRef.current.value)
      .then((response) => {
        modificarAlbaranEntradas(
          state.listaAlbaranesEntrada.id,
          fechaAlbaranRef.current.value,
          numeroAlbaranRef.current.value,
          response.data.id,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
          })
          .catch((error) => (error.response.status === 409 || error.response.status === 400)
          && modal.handleOpenError(error.response.data.mensaje));
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      fechaAlbaran: changeFecha.value,
      numeroAlbaran: state.listaAlbaranesEntrada.numeroAlbaran,
      proveedor: state.listaAlbaranesEntrada.proveedor.dniCif,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaAlbaran"
                name="fechaAlbaran"
                label="fecha del albarán"
                inputFormat="DD-MM-YYYY"
                value={changeFecha.value}
                onChange={changeFecha.handleChange}
                error={formik.touched.fechaAlbaran && Boolean(formik.errors.fechaAlbaran)}
                helperText={formik.touched.fechaAlbaran && formik.errors.fechaAlbaran}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaAlbaranRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="numeroAlbaran"
            name="numeroAlbaran"
            label="nº. de albarán"
            size="small"
            value={formik.values.numeroAlbaran}
            onChange={formik.handleChange}
            error={formik.touched.numeroAlbaran && Boolean(formik.errors.numeroAlbaran)}
            helperText={formik.touched.numeroAlbaran && formik.errors.numeroAlbaran}
            inputRef={numeroAlbaranRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="proveedor"
            name="proveedor"
            label="proveedor (dni / cif)"
            size="small"
            value={formik.values.proveedor}
            onChange={formik.handleChange}
            error={formik.touched.proveedor && Boolean(formik.errors.proveedor)}
            helperText={formik.touched.proveedor && formik.errors.proveedor}
            inputRef={proveedorRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Aceptar</Button>
          <ModalOK open={modal.open} handleClose={modal.handleClose} />
          <ModalErrores
            openError={modal.openError}
            message={modal.message}
            handleCloseError={modal.handleCloseError}
          />
        </Box>
      </form>
    </Box>
  );
}
