import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 90 },
  { field: 'primerApellido', headerName: '1º apellido', width: 90 },
  { field: 'segundoApellido', headerName: '2º apellido', width: 90 },
  { field: 'dni', headerName: 'DNI', width: 100 },
];

function TablaPropietarios() {
  const { state, ListarPropietarios } = useContext(DatosGeneralesFormContext);

  useEffect(() => {
    ListarPropietarios();
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
        rows={state.listaPropietarios}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}

export default TablaPropietarios;
