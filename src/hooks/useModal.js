import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenError = (messag) => {
    setOpenError(true);
    setMessage(messag);
  };
  const handleCloseError = () => setOpenError(false);

  return {
    open,
    setOpen,
    openError,
    setOpenError,
    message,
    setMessage,
    handleOpen,
    handleClose,
    handleOpenError,
    handleCloseError,
  };
};

export default useModal;
