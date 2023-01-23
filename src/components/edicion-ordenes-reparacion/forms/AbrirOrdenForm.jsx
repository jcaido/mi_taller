import React from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
// import ModalOK from '../../../utils/ModalOK';
// import ModalErrores from '../../../utils/ModalErrores';

function AbrirOrdenForm() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const [openError, setOpenError] = useState(false);
  // const [message, setMessage] = useState('');
  //  const handleOpenError = (messag) => {
  //  setOpenError(true);
  //  setMessage(messag);
  // };
  // const handleCloseError = () => setOpenError(false);

  const handleSubmitForm = () => {
    // kkkk
  };

  const formik = useFormik({
    onSubmit: () => handleSubmitForm(),
  });

  return (
    <Box m={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box m={1}>
          <Button type="submit" color="primary" variant="contained" fullWidth>Abrir Orden de Reparacion</Button>
        </Box>
        {/* <ModalOK open={open} handleClose={handleClose} /> */}
        {/* <ModalErrores /> */}
      </form>
    </Box>
  );
}

export default AbrirOrdenForm;
