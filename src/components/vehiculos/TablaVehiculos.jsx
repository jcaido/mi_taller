import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const columns = [

  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'matricula', headerName: 'Matricula', width: 90 },
  { field: 'marca', headerName: 'Marca', width: 90 },
  { field: 'modelo', headerName: 'Modelo', width: 90 },
  { field: 'propietarioDni', headerName: 'Propietario', width: 100 },
];

function TablaVehiculos() {
  const { state, ListarVehiculos } = useContext(DatosGeneralesFormContext);

  useEffect(() => {
    ListarVehiculos();
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
        rows={state.listaVehiculos}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              marca: false,
              modelo: false,
            },
          },
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}

export default TablaVehiculos;
