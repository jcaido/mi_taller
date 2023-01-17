import React, { useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { nuevoPropietario, obtenerCodigoPostalPorCodigo } from '../../../services/axiosService';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';

const validationSchema = yup.object({
  nombre: yup
    .string('Introduzca el nombre')
    .required('El nombre es obligatorio'),
  primerApellido: yup
    .string('Introduzca el primer apellido')
    .required('El primer apellido es obligatorio'),
  segundoApellido: yup
    .string('Introduzca el segundo apellido')
    .required('el segundo apellido es obligatorio'),
  dni: yup
    .string('Introduzca el DNI')
    .required('el DNI es obligatorio'),
  domicilio: yup
    .string('Introduzca el domicilio')
    .required('El domicilio es obligatorio'),
  codigoPostal: yup
    .string('Introduzca el codigo postal')
    .required('El codigo postal es obligatorio'),
});

function NuevoPropietarioForm() {
  const { ListarPropietarios } = useContext(DatosGeneralesFormContext);

  const nombreRef = useRef();
  const primerApellidoRef = useRef();
  const segundoApellidoRef = useRef();
  const dniRef = useRef();
  const domicilioRef = useRef();
  const codigoPostalRef = useRef();

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
    obtenerCodigoPostalPorCodigo(codigoPostalRef.current.value)
      .then((response) => {
        nuevoPropietario(
          nombreRef.current.value,
          primerApellidoRef.current.value,
          segundoApellidoRef.current.value,
          dniRef.current.value,
          domicilioRef.current.value,
          response.data.id,
        )
          .then(() => {
            formik.resetForm();
            handleOpen();
            ListarPropietarios();
          })
          .catch((error) => error.response.status === 409
          && handleOpenError(error.response.data.mensaje));
      })
      .catch((error) => error.response.status === 404
      && handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      dni: '',
      domicilio: '',
      codigoPostal: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <Box>
        <Divider>
          <Chip label="Nuevo propietario" />
        </Divider>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            fullWidth
            id="nombre"
            name="nombre"
            label="nombre"
            size="small"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            inputRef={nombreRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="primerApellido"
            name="primerApellido"
            label="primer apellido"
            size="small"
            value={formik.values.primerApellido}
            onChange={formik.handleChange}
            error={formik.touched.primerApellido && Boolean(formik.errors.primerApellido)}
            helperText={formik.touched.primerApellido && formik.errors.primerApellido}
            inputRef={primerApellidoRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="segundoApellido"
            name="segundoApellido"
            label="segundo apellido"
            size="small"
            value={formik.values.segundoApellido}
            onChange={formik.handleChange}
            error={formik.touched.segundoApellido && Boolean(formik.errors.segundoApellido)}
            helperText={formik.touched.segundoApellido && formik.errors.segundoApellido}
            inputRef={segundoApellidoRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="dni"
            name="dni"
            label="DNI"
            size="small"
            value={formik.values.dni}
            onChange={formik.handleChange}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
            inputRef={dniRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="domicilio"
            name="domicilio"
            label="domicilio"
            size="small"
            value={formik.values.domicilio}
            onChange={formik.handleChange}
            error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
            helperText={formik.touched.domicilio && formik.errors.domicilio}
            inputRef={domicilioRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            fullWidth
            id="codigoPostal"
            name="codigoPostal"
            label="codigo postal"
            size="small"
            value={formik.values.codigoPostal}
            onChange={formik.handleChange}
            error={formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal)}
            helperText={formik.touched.codigoPostal && formik.errors.codigoPostal}
            inputRef={codigoPostalRef}
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

export default NuevoPropietarioForm;
