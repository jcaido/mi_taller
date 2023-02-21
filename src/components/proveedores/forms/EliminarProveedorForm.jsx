import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useModal from '../../../hooks/useModal';
import { AlmacenProveedoresContext } from '../../../pages/AlmacenProveedores';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';

export default function EliminarProveedorForm() {
  const { state } = useContext(AlmacenProveedoresContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    //
  };

  const formik = useFormik({
    initialValues: {
      nombre: state.listaProveedores.nombre,
      dniCif: state.listaProveedores.dniCif,
      domicilio: state.listaProveedores.domicilio,
      codigoPostal: state.listaProveedores.codigoPostal,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="nombre"
            name="nombre"
            label="nombre"
            size="small"
            value={state.listaProveedores.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="dniCif"
            name="dniCif"
            label="dni / cif"
            size="small"
            value={state.listaProveedores.dniCif}
            onChange={formik.handleChange}
            error={formik.touched.dniCif && Boolean(formik.errors.dniCif)}
            helperText={formik.touched.dniCif && formik.errors.dniCif}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="domicilio"
            name="domicilio"
            label="domicilio"
            size="small"
            value={state.listaProveedores.domicilio}
            onChange={formik.handleChange}
            error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
            helperText={formik.touched.domicilio && formik.errors.domicilio}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            sx={{ width: '40%' }}
            id="codigoPostal"
            name="codigoPostal"
            label="codigo postal"
            size="small"
            value={state.listaProveedores.codigoPostal}
            onChange={formik.handleChange}
            error={formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal)}
            helperText={formik.touched.codigoPostal && formik.errors.codigoPostal}
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
