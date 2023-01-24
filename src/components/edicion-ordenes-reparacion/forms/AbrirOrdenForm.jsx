import React, { useContext } from 'react';
import Button from '@mui/material/Button';
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
    <Button onClick={handleClick} color="primary" variant="contained">Abrir Orden de Reparacion</Button>
  );
}

export default AbrirOrdenForm;
