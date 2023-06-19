import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CabeceraForms from '../CabeceraForms';

export default function TablaOrdenesReparacionNoFacturadasEditar({
  obtenerOrdenesReparacionNoFacturadas,
  ordenesReparacionNoFacturadas,
  seleccionarOrdenReparacion,
}) {
  useEffect(() => {
    obtenerOrdenesReparacionNoFacturadas();
  }, []);

  return (
    <>
      <Box m={2}>
        <CabeceraForms label="Seleccionar orden de reparación cerrada pendientes de facturar" />
      </Box>
      <Box m={1}>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }} align="left">Referencia-id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }} align="left">Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }} align="left">Matricula</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }} align="left">Marca</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }} align="left">Modelo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 300 }} align="left">Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenesReparacionNoFacturadas.map(
                (ordenReparacion) => (
                  <TableRow
                    key={ordenReparacion.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => seleccionarOrdenReparacion(ordenReparacion.id)}
                  >
                    <TableCell align="left">{ordenReparacion.id}</TableCell>
                    <TableCell align="left">{ordenReparacion.fechaCierre}</TableCell>
                    <TableCell align="left">{ordenReparacion.vehiculoMatricula}</TableCell>
                    <TableCell align="left">{ordenReparacion.vehiculoMarca}</TableCell>
                    <TableCell align="left">{ordenReparacion.vehiculoModelo}</TableCell>
                    <TableCell align="left">{ordenReparacion.descripcion}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
