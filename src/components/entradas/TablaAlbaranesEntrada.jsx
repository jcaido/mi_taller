import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AlmacenEntradasContext } from '../../pages/AlmacenEntradas';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fechaAlbaran', headerName: 'Fecha de Albarán', width: 200 },
  { field: 'numeroAlbaran', headerName: 'Número de Albarán', width: 200 },
  { field: 'proveedorNombre', headerName: 'Proveedor', width: 300 },
  { field: 'proveedorDniCif', headerName: 'DNI / CIF', width: 300 },
];

export default function TablaAlbaranesEntrada() {
  const { state, ListarAlbaranesEntrada } = useContext(AlmacenEntradasContext);

  useEffect(() => {
    ListarAlbaranesEntrada();
  }, []);

  return (
    <div style={{ height: 300, width: '100%' }}>
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
        rows={state.listaAlbaranesEntrada}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}
