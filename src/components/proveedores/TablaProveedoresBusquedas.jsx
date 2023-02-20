import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nombre', headerName: 'Nombre', width: 400 },
  { field: 'dniCif', headerName: 'DNI / CIF', width: 250 },
];

export default function TablaProveedoresBusquedas({ lista }) {
  return (
    <div style={{ height: 315, width: '100%' }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rows={lista}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}
