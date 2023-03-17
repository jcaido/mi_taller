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
import CabeceraForms from '../../CabeceraForms';
import ModalOK from '../../../utils/ModalOK';
import ModalErrores from '../../../utils/ModalErrores';
import useModal from '../../../hooks/useModal';
import { nuevaFacturaProveedor, obtenerProveedorPorDniCif } from '../../../services/axiosService';
import { FacturacionProveedoresContext } from '../../../pages/FacturacionProveedores';

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

export default function NuevaFacturaProveedorForm() {
  const
    {
      obtenerIdFacturaProveedor,
      obtenerIdProveedor,
      obtenerFechaFacturaProveedor,
      obtenerNumeroFacturaProveedor,
      obtenerNombreProveedor,
      obtenerCifNifProveedr,
      obtenerDomicilioProveedor,
      obtenerCodigoPostalProveedor,
      obtenerLocalidadProveedor,
      obtenerProvinciaProveedor,
      obtenerTipoIvaFacturaProveedor,
      tablasAlbaranesDispatch,
    } = useContext(FacturacionProveedoresContext);

  const fechaFacturaRef = useRef();
  const numeroFacturaRef = useRef();
  const tipoIVARef = useRef();
  const proveedorRef = useRef();

  const modal = useModal();

  const changeFecha = useChangeFecha(new Date());

  const handleSubmitForm = () => {
    obtenerProveedorPorDniCif(proveedorRef.current.value)
      .then((response) => {
        nuevaFacturaProveedor(
          fechaFacturaRef.current.value,
          numeroFacturaRef.current.value,
          tipoIVARef.current.value,
          response.data.id,
        )
          .then((res) => {
            obtenerIdProveedor(response.data.id);
            obtenerIdFacturaProveedor(res.data.id);
            obtenerFechaFacturaProveedor(res.data.fechaFactura);
            obtenerNumeroFacturaProveedor(res.data.numeroFactura);
            obtenerNombreProveedor(res.data.proveedor.nombre);
            obtenerCifNifProveedr(res.data.proveedor.dniCif);
            obtenerDomicilioProveedor(res.data.proveedor.domicilio);
            obtenerCodigoPostalProveedor(res.data.proveedor.codigoPostal.codigo);
            obtenerLocalidadProveedor(res.data.proveedor.codigoPostal.localidad);
            obtenerProvinciaProveedor(res.data.proveedor.codigoPostal.provincia);
            obtenerTipoIvaFacturaProveedor(res.data.tipoIVA);
            tablasAlbaranesDispatch();
          });
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const formik = useFormik({
    initialValues: {
      fechaFactura: changeFecha.value,
      numeroFactura: '',
      tipoIva: 21,
      proveedor: '',
    },
    validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <CabeceraForms label="Nueva factura proveedor" />
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
