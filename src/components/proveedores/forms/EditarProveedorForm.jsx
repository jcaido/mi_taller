import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useModal from '../../../hooks/useModal';
import { AlmacenProveedoresContext } from '../../../pages/AlmacenProveedores';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { modificarPropveedor, obtenerCodigoPostalPorCodigo } from '../../../services/axiosService';

const validationSchema = yup.object({
  nombre: yup
    .string('Introduzca el nombre')
    .required('El nombre es obligatorio'),
  dniCif: yup
    .string('Introduzca el DNI/CIF')
    .required('el DNI/CIF es obligatorio'),
  domicilio: yup
    .string('Introduzca el domicilio')
    .required('El domicilio es obligatorio'),
  codigoPostal: yup
    .string('Introduzca el codigo postal')
    .required('El codigo postal es obligatorio'),
});

export default function EditarProveedorForm() {
  const { state } = useContext(AlmacenProveedoresContext);

  const nombreRef = useRef();
  const dniCifRef = useRef();
  const domicilioRef = useRef();
  const codigoPostalRef = useRef();

  const modal = useModal();

  const handleSubmitForm = () => {
    obtenerCodigoPostalPorCodigo(codigoPostalRef.current.value)
      .then((response) => {
        modificarPropveedor(
          state.listaProveedores.id,
          nombreRef.current.value,
          dniCifRef.current.value,
          domicilioRef.current.value,
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
      nombre: state.listaProveedores.nombre,
      dniCif: state.listaProveedores.dniCif,
      domicilio: state.listaProveedores.domicilio,
      codigoPostal: state.listaProveedores.codigoPostal.codigo,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            sx={{ width: '40%' }}
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
            sx={{ width: '40%' }}
            id="dniCif"
            name="dniCif"
            label="dni / cif"
            size="small"
            value={formik.values.dniCif}
            onChange={formik.handleChange}
            error={formik.touched.dniCif && Boolean(formik.errors.dniCif)}
            helperText={formik.touched.dniCif && formik.errors.dniCif}
            inputRef={dniCifRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            sx={{ width: '40%' }}
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
            sx={{ width: '40%' }}
            id="codigoPostal"
            name="codigoPostal"
            label="codigo Postal"
            size="small"
            value={formik.values.codigoPostal}
            onChange={formik.handleChange}
            error={formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal)}
            helperText={formik.touched.codigoPostal && formik.errors.codigoPostal}
            inputRef={codigoPostalRef}
          />
        </Box>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" sx={{ width: '40%' }}>Aceptar</Button>
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
