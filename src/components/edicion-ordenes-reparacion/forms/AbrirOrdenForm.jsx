import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import BlindsIcon from '@mui/icons-material/Blinds';
import { EdicionOrdenesContext } from '../../../pages/TallerEdicionOrdenes';
import { modificarOrdenReparacionAbrir } from '../../../services/axiosService';

function AbrirOrdenForm() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaActualizar,
    seleccionarOrdenReparacionFormDispatch,
  } = useContext(EdicionOrdenesContext);

  const handleClick = () => {
    modificarOrdenReparacionAbrir(state.ordenReparacionPorId.id)
      .then(() => {
        ObtenerOrdenReparacionPorIdParaActualizar(state.ordenReparacionPorId.id);
        seleccionarOrdenReparacionFormDispatch();
      });
  };

  return (
    <Button onClick={handleClick} color="primary" variant="contained" startIcon={<BlindsIcon />}>Abrir</Button>
  );
}

export default AbrirOrdenForm;
