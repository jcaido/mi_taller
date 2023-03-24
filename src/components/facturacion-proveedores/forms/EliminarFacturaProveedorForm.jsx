import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FacturacionProveedoresContext } from '../../../pages/FacturacionProveedores';
import useModal from '../../../hooks/useModal';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import CabeceraForms from '../../CabeceraForms';

export default function EliminarFacturaProveedorForm() {
  const { state } = useContext(FacturacionProveedoresContext);

  const modal = useModal();

  const handleSubmitForm = () => {
    //
  };

  const formik = useFormik({
    initialValues: {
      fechaFactura: state.facturaProveedor.fechaFactura,
      numeroFactura: state.facturaProveedor.numeroFactura,
      tipoIVA: state.facturaProveedor.tipoIVA,
      proveedor: state.facturaProveedor.proveedor.dniCif,
    },
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box>
      <CabeceraForms label="Eliminar factura proveedor" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <TextField
            disabled
            id="fechaFactura"
            name="fechaFactura"
            label="fecha factura"
            size="small"
            value={state.facturaProveedor.fechaFactura}
            onChange={formik.handleChange}
            error={formik.touched.fechaFactura && Boolean(formik.errors.fechaFactura)}
            helperText={formik.touched.fechaFactura && formik.errors.fechaFactura}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            id="numeroFactura"
            name="numeroFactura"
            label="numero factura"
            size="small"
            value={state.facturaProveedor.numeroFactura}
            onChange={formik.handleChange}
            error={formik.touched.numeroFactura && Boolean(formik.errors.numeroFactura)}
            helperText={formik.touched.numeroFactura && formik.errors.numeroFactura}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            id="tipoIVA"
            name="tipoIVA"
            label="tipo de IVA"
            size="small"
            value={state.facturaProveedor.tipoIVA}
            onChange={formik.handleChange}
            error={formik.touched.tipoIVA && Boolean(formik.errors.tipoIVA)}
            helperText={formik.touched.tipoIVA && formik.errors.tipoIVA}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled
            id="proveedor"
            name="proveedor"
            label="proveedor"
            size="small"
            value={state.facturaProveedor.proveedor.dniCif}
            onChange={formik.handleChange}
            error={formik.touched.proveedor && Boolean(formik.errors.proveedor)}
            helperText={formik.touched.proveedor && formik.errors.proveedor}
          />
        </Box>
        <Box m={1}>
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
