import React, { useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { FacturacionProveedoresContext } from '../../../pages/FacturacionProveedores';
import useChangeFecha from '../../../hooks/useChangeFecha';
import CabeceraForms from '../../CabeceraForms';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import useModal from '../../../hooks/useModal';

const validationSchema = yup.object({
  fechaFactura: yup
    .date()
    .nullable()
    .required('La fecha de la factura es obligatoria'),
  numeroFactura: yup
    .string('Introduzca el número de la factura')
    .required('El número de la factura es obligatorio'),
  tipoIVA: yup
    .number('Introduzca el tipo de IVA')
    .typeError('Introduzca un dato numerico'),
  // .required('El tipo de IVA es obligatorio'),
  proveedor: yup
    .string('Introduzca la referencia (id) del proveedor')
    .required('El proveedor es obligatorio'),
});

export default function EditarFacturaProveedorForm() {
  const { state } = useContext(FacturacionProveedoresContext);

  const fechaFacturaRef = useRef();
  const numeroFacturaRef = useRef();
  const tipoIVARef = useRef();
  const proveedorRef = useRef();

  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);

  const modal = useModal();

  const fecha = state.facturaProveedor.fechaFactura.split('-');

  const changeFecha = useChangeFecha(`${fecha[1]}-${fecha[0]}-${fecha[2]}`);

  const handleSubmitForm = () => {
    //
  };

  const formik = useFormik({
    initialValues: {
      fechaFactura: changeFecha.value,
      numeroFactura: state.facturaProveedor.numeroFactura,
      tipoIva: state.facturaProveedor.tipoIVA,
      proveedor: state.facturaProveedor.proveedor.dniCif,
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Editar factura proveedor" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                disabled={disabled}
                id="fechaFactura"
                name="fechaFactura"
                label="fecha de la factura"
                inputFormat="DD-MM-YYYY"
                value={changeFecha.value}
                onChange={changeFecha.handleChange}
                error={formik.touched.fechaFactura && Boolean(formik.errors.fechaFactura)}
                helperText={formik.touched.fechaFactura && formik.errors.fechaFactura}
                renderInput={(params) => <TextField {...params} />}
                inputRef={fechaFacturaRef}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <TextField
            disabled={disabled}
            fullWidth
            id="numeroFactura"
            name="numeroFactura"
            label="nº. de factura"
            size="small"
            value={formik.values.numeroFactura}
            onChange={formik.handleChange}
            error={formik.touched.numeroFactura && Boolean(formik.errors.numeroFactura)}
            helperText={formik.touched.numeroFactura && formik.errors.numeroFactura}
            inputRef={numeroFacturaRef}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled={disabled}
            fullWidth
            id="tipoIva"
            name="tipoIva"
            label="tipo de IVA"
            size="small"
            value={formik.values.tipoIva}
            onChange={formik.handleChange}
            error={formik.touched.tipoIva && Boolean(formik.errors.tipoIva)}
            helperText={formik.touched.tipoIva && formik.errors.tipoIva}
            inputRef={tipoIVARef}
          />
        </Box>
        <Box m={1}>
          <TextField
            disabled={disabled}
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
          <Button type="submit" color="primary" variant="contained" fullWidth disabled={disabled}>Aceptar</Button>
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
