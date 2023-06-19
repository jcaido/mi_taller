import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { FacturacionClientesContext } from '../../../pages/FacturacionClientes';
import useModal from '../../../hooks/useModal';
import useChangeFecha from '../../../hooks/useChangeFecha';
import CabeceraForms from '../../CabeceraForms';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';

const validationSchema = yup.object({
  fechaFactura: yup
    .date()
    .nullable()
    .required('La fecha de la factura es obligatoria'),
  tipoIVA: yup
    .number('Introduzca el tipo de IVA')
    .typeError('Introduzca un dato numerico'),
});

export default function EditarFacturaClienteForm({
  handleSubmitEditarFacturaForm,
  ordenReparacionAFacturar,
  disabled,
  setDisabled,
}) {
  const {
    state,
    // actualizarFacturaCliente,
  } = useContext(FacturacionClientesContext);

  const fechaFacturaRef = useRef();
  const tipoIVARef = useRef();

  const modal = useModal();

  const fecha = state.facturaCliente.fechaFactura.split('-');

  const changeFecha = useChangeFecha(`${fecha[1]}-${fecha[0]}-${fecha[2]}`);

  useEffect(() => {
    setDisabled(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      fechaFactura: changeFecha.value,
      tipoIva: state.facturaCliente.tipoIVA,
    },
    validationSchema,
    onSubmit: () => handleSubmitEditarFacturaForm(
      state.facturaCliente.id,
      fechaFacturaRef.current.value,
      tipoIVARef.current.value,
      ordenReparacionAFacturar.id,
    ),
  });

  return (
    <Box>
      <CabeceraForms label="Editar factura cliente" />
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
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
          <Button type="submit" color="primary" variant="contained" fullWidth disabled={disabled}>Modificar</Button>
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
