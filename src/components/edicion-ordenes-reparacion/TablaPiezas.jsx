import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import EliminarPieza from './EliminarPieza';
import { eliminarPiezaReparacion } from '../../services/axiosService';

function TablaPiezas() {
  const { state, ObtenerOrdenReparacionPorIdParaActualizar } = useContext(EdicionOrdenesContext);

  const eliminarPieza = (idPiezaReparacion) => {
    eliminarPiezaReparacion(idPiezaReparacion)
      .then(() => {
        ObtenerOrdenReparacionPorIdParaActualizar(state.ordenReparacionPorId.id);
      })
      .catch((error) => {
        alert(`something went wrong: ${error}`);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Referencia</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Pieza</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Cantidad</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.ordenReparacionPorId.piezasReparacion.map(
            (datosPieza) => (
              <TableRow key={datosPieza.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{datosPieza.pieza.referencia}</TableCell>
                <TableCell align="left">{datosPieza.pieza.nombre}</TableCell>
                <TableCell align="left">{datosPieza.cantidad}</TableCell>
                <TableCell align="left"><EliminarPieza eliminarPieza={() => eliminarPieza(datosPieza.id)} /></TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaPiezas;
