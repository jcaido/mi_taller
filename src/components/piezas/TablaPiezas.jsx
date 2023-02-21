import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AlmacenPiezassContext } from '../../pages/AlmacenPiezas';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'referencia', headerName: 'Referencia', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'precio', headerName: 'Precio', width: 150 },
];

export default function TablaPiezas() {
  const { state, ListarPiezas } = useContext(AlmacenPiezassContext);

  useEffect(() => {
    ListarPiezas();
  }, []);

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
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
        rows={state.listaPiezas}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}
