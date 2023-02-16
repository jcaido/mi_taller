import React, { useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { AutorizacionOrdenesContext } from '../../../pages/TallerAutorizacionOrdenes';
import { modificarOrdenReparacion, obtenerVehiculosPorMatricula } from '../../../services/axiosService';
import CabeceraForms from '../../CabeceraForms';
import useModal from '../../../hooks/useModal';

const validationSchema = yup.object({
  fechaApertura: yup
    .date()
    .nullable()
    .required('La fecha de apertura es obligatoria'),
  matricula: yup
    .string('Introduzca la matricula')
    .required('La matricula es obligatoria'),
  descripcion: yup
    .string('Introduzca la descripcion del trabajo a realizar')
    .required('La descripcion es obligatoria'),
  kilometros: yup
    .number('Introduzca los kilometros del vehiculo')
    .typeError('Introduzca un dato numerico')
    .required('Los kilometros son obligatorios'),
});

function EditarOrdenReparacionForm() {
  const { state } = useContext(AutorizacionOrdenesContext);

  const fechaAperturaRef = useRef();
  const matriculaRef = useRef();
  const descripcionRef = useRef();
  const kilometrosRef = useRef();

  const modal = useModal();

  const fecha = state.listaOrdenReparacionPorId.fechaApertura.split('-');

  const [value, setValue] = useState(`${fecha[1]}-${fecha[0]}-${fecha[2]}`);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmitForm = () => {
    obtenerVehiculosPorMatricula(matriculaRef.current.value)
      .then((response) => {
        modificarOrdenReparacion(
          state.listaOrdenReparacionPorId.id,
          fechaAperturaRef.current.value,
          descripcionRef.current.value,
          kilometrosRef.current.value,
          response.data.id,
        )
          .then(() => {
            formik.resetForm();
            modal.handleOpen();
          })
          .catch((error) => error.response.status === 409
          && modal.handleOpenError(error.response.data.mensaje))
          .catch((error) => (error.response.status === 400
          && error.response.data.fechaApertura === 'la fecha de apertura no puede ser nula')
          && modal.handleOpenError(error.response.data.fechaApertura))
          .catch((error) => (error.response.status === 400
            && error.response.data.descripcion === 'debe introducir la descripcion')
            && modal.handleOpenError(error.response.data.descripcion));
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      fechaApertura: value,
      matricula: state.listaOrdenReparacionPorId.vehiculoMatricula,
      descripcion: state.listaOrdenReparacionPorId.descripcion,
      kilometros: state.listaOrdenReparacionPorId.kilometros,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Editar orden de reparacion" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="fechaApertura"
                name="fechaApertura"
                label="fecha de apertura"
                inputFormat="DD-MM-YYYY"
                value={value}
                onChange={handleChange}
                error={formik.touched.fechaApertura && Boolean(formik.errors.fechaApertura)}
                helperText={formik.touched.fechaApertura && formik.errors.fechaApertura}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaAperturaRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="matricula"
            name="matricula"
            label="matricula"
            size="small"
            value={formik.values.matricula}
            onChange={formik.handleChange}
            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
            helperText={formik.touched.matricula && formik.errors.matricula}
            inputRef={matriculaRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="descripcion"
            size="small"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
            inputRef={descripcionRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="kilometros"
            name="kilometros"
            label="kilometros"
            size="small"
            value={formik.values.kilometros}
            onChange={formik.handleChange}
            error={formik.touched.kilometros && Boolean(formik.errors.kilometros)}
            helperText={formik.touched.kilometros && formik.errors.kilometros}
            inputRef={kilometrosRef}
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

export default EditarOrdenReparacionForm;
