import React, { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'codigo', headerName: 'Codigo', width: 90 },
  { field: 'localidad', headerName: 'Localidad', width: 170 },
  { field: 'provincia', headerName: 'Provincia', width: 110 },
];

function TablaCodigosPostales() {
  const { state, ListarCodigosPostales } = useContext(DatosGeneralesFormContext);

  useEffect(() => {
    ListarCodigosPostales();
  }, []);

  return (
    <div style={{ height: 315, width: '100%' }}>
      { state.cargando ? (
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
          rows={state.listaCodigosPostales}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
      ) : (
        <div style={
          {
            height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center',
          }
        }
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default TablaCodigosPostales;
