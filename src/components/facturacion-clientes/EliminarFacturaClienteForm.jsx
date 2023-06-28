import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FacturacionClientesContext } from '../../pages/FacturacionClientes';
import useModal from '../../hooks/useModal';
import CabeceraForms from '../CabeceraForms';
import ModalOK from '../../utils/ModalOK';
import ModalErrores from '../../utils/ModalErrores';
import { eliminarFacturaCliente } from '../../services/axiosService';

export default function EliminarFacturaClienteForm() {
  const { state } = useContext(FacturacionClientesContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    eliminarFacturaCliente(state.facturaCliente.id)
      .then(() => {
        modal.handleOpen();
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      id: state.facturaCliente.id,
      fechaFactura: state.facturaCliente.fechaFactura,
      tipoIVA: state.facturaCliente.tipoIVA,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box>
      <CabeceraForms label="Eliminar factura cliente" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            fullWidth
            id="id"
            name="referencia(id)"
            label="referencia(id)"
            size="small"
            value={state.facturaCliente.id}
            onChange={formik.handleChange}
            error={formik.touched.input && Boolean(formik.errors.input)}
            helperText={formik.touched.input && formik.errors.input}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            id="fechaFactura"
            name="fechaFactura"
            label="fecha factura"
            size="small"
            value={state.facturaCliente.fechaFactura}
            onChange={formik.handleChange}
            error={formik.touched.fechaFactura && Boolean(formik.errors.fechaFactura)}
            helperText={formik.touched.fechaFactura && formik.errors.fechaFactura}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            id="tipoIVA"
            name="tipoIVA"
            label="tipo de IVA"
            size="small"
            value={state.facturaCliente.tipoIVA}
            onChange={formik.handleChange}
            error={formik.touched.tipoIVA && Boolean(formik.errors.tipoIVA)}
            helperText={formik.touched.tipoIVA && formik.errors.tipoIVA}
          />
        </Box>
        <Box>
          <Button type="submit" color="primary" variant="contained" sx={{ width: '60%' }}>Aceptar</Button>
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
