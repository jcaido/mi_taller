import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';

const columns = [

  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'fechaApertura', headerName: 'Fecha Apertura', width: 115 },
  { field: 'vehiculoMatricula', headerName: 'Matricula', width: 90 },
  { field: 'vehiculoMarca', headerName: 'Marca', width: 110 },
  { field: 'vehiculoModelo', headerName: 'Modelo', width: 110 },
  { field: 'descripcion', headerName: 'Trabajos', width: 350 },
  { field: 'kilometros', headerName: 'Kilometros', width: 100 },
];

function TablaOrdenesReparacion() {
  const { state, ListarOrdenesReparacionAbiertas } = useContext(AutorizacionOrdenesContext);

  useEffect(() => {
    ListarOrdenesReparacionAbiertas();
  }, []);

  return (
    <Box m={2}>
      <Box>
        <Divider>
          <Chip label="Ordenes de reparacion abiertas" />
        </Divider>
      </Box>
      <Box m={1} sx={{ height: 315, width: '100%' }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          rows={state.listaOrdenesReparacionAbiertas}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
      </Box>
    </Box>
  );
}

export default TablaOrdenesReparacion;
