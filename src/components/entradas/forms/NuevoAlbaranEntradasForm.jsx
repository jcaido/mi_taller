import React, { useContext, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useChangeFecha from '../../../hooks/useChangeFecha';
import useModal from '../../../hooks/useModal';
import CabeceraForms from '../../CabeceraForms';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { nuevoAlbaranEntrada, obtenerProveedorPorDniCif } from '../../../services/axiosService';
import { AlmacenEntradasContext } from '../../../pages/AlmacenEntradas';

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

export default function NuevoAlbaranEntradasForm() {
  const { ListarAlbaranesEntrada } = useContext(AlmacenEntradasContext);

  const fechaAlbaranRef = useRef();
  const numeroAlbaranRef = useRef();
  const proveedorRef = useRef();

  const modal = useModal();

  const changeFecha = useChangeFecha(new Date());

  const handleSubmitForm = () => {
    obtenerProveedorPorDniCif(proveedorRef.current.value)
      .then((response) => {
        nuevoAlbaranEntrada(
          fechaAlbaranRef.current.value,
          numeroAlbaranRef.current.value,
          response.data.id,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
            ListarAlbaranesEntrada();
          })
          .catch((error) => {
            if (error.response.status === 400 && error.response.data.fechaApertura === 'la fecha del albarán no puede ser nula') {
              modal.handleOpenError(error.response.data.fechaApertura);
            } else if (error.response.status === 400 && error.response.data.descripcion === 'El número del albarán es obligatorio') {
              modal.handleOpenError(error.response.data.descripcion);
            } else {
              modal.handleOpenError(error.response.data.mensaje);
            }
          });
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      fechaAlbaran: changeFecha.value,
      numeroAlbaran: '',
      proveedor: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Nuevo albarán de entrada" />
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
