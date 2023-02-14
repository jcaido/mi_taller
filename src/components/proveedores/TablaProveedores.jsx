import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AlmacenProveedoresContext } from '../../pages/AlmacenProveedores';

const columns = [

  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre', headerName: 'Nombre', width: 400 },
  { field: 'dniCif', headerName: 'DNI/CIF', width: 150 },
];

export default function TablaProveedores() {
  const { state, ListarProveedores } = useContext(AlmacenProveedoresContext);

  useEffect(() => {
    ListarProveedores();
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
        rows={state.listaProveedores}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}
