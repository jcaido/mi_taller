import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import { DatosGeneralesFormContext } from '../../../pages/DatosGenerales';
import { eliminarVehiculo } from '../../../services/axiosService';
import useModal from '../../../hooks/useModal';

function EliminarVehiculoForm() {
  const { state } = useContext(DatosGeneralesFormContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    eliminarVehiculo(state.listaVehiculosPorMatricula.id)
      .then(() => {
        formik.resetForm();
        modal.handleOpen();
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({

    initialValues: {
      matricula: state.listaVehiculosPorMatricula.matricula,
      marca: state.listaVehiculosPorMatricula.marca,
      modelo: state.listaVehiculosPorMatricula.modelo,
      color: state.listaVehiculosPorMatricula.color,
      propietario: state.listaVehiculosPorMatricula.propietario.dni,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="matricula"
            name="matricula"
            label="matricula"
            size="small"
            value={state.listaVehiculosPorMatricula.matricula}
            onChange={formik.handleChange}
            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
            helperText={formik.touched.matricula && formik.errors.matricula}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="marca"
            name="marca"
            label="marca"
            size="small"
            value={state.listaVehiculosPorMatricula.marca}
            onChange={formik.handleChange}
            error={formik.touched.marca && Boolean(formik.errors.marca)}
            helperText={formik.touched.marca && formik.errors.marca}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="modelo"
            name="modelo"
            label="modelo"
            size="small"
            value={state.listaVehiculosPorMatricula.modelo}
            onChange={formik.handleChange}
            error={formik.touched.modelo && Boolean(formik.errors.modelo)}
            helperText={formik.touched.modelo && formik.errors.modelo}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="color"
            name="color"
            label="color"
            size="small"
            value={state.listaVehiculosPorMatricula.color}
            onChange={formik.handleChange}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="propietario"
            name="propietario"
            label="propietario"
            size="small"
            value={state.listaVehiculosPorMatricula.propietario.dni}
            onChange={formik.handleChange}
            error={formik.touched.propietario && Boolean(formik.errors.propietario)}
            helperText={formik.touched.propietario && formik.errors.propietario}
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

export default EliminarVehiculoForm;
