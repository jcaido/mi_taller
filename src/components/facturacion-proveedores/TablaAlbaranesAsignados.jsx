import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import CabeceraForms from '../CabeceraForms';

export default function TablaAlbaranesAsignados({
  albaranes, obtenerAlbaranesAsignados, totalAlbaran, handleClickNoFacturarAlbaranFacturado,
}) {
  useEffect(() => {
    obtenerAlbaranesAsignados([]);
  }, []);

  return (
    <>
      <Box m={2}>
        <CabeceraForms label="Albaranes asignados" />
      </Box>
      <Box m={1}>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Referencia-id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Numero</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albaranes.map(
                (albaran) => (
                  <TableRow key={albaran.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">{albaran.id}</TableCell>
                    <TableCell align="left">{albaran.fechaAlbaran}</TableCell>
                    <TableCell align="left">{albaran.numeroAlbaran}</TableCell>
                    <TableCell align="left">{totalAlbaran(albaran.id, albaranes).toLocaleString('en')}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Facturar albarán">
                        <IconButton aria-label="delete" size="small" color="error" onClick={() => handleClickNoFacturarAlbaranFacturado(albaran.id)}>
                          <ClearIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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
