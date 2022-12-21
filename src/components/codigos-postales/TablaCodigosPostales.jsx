import React, { useContext, useEffect } from 'react';
import { DataGrid }  from '@mui/x-data-grid';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const columns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'codigo', headerName: 'Codigo', width: 130 },
    { field: 'localidad', headerName: 'Localidad', width: 130 },
    { field: 'provincia', headerName: 'Provincia', width: 130 },
]

const TablaCodigosPostales = () => {

const { state, ListarCodigosPostales } = useContext(DatosGeneralesFormContext);

    useEffect(() => {
        
        ListarCodigosPostales();

    },[ListarCodigosPostales]);

    return (
        <div style={{ height: 315, width: '100%' }}>
            <DataGrid
                sx = {{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    }
                }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'id', sort: 'desc'}]
                    }
                }}
                rows={state.listaCodigosPostales}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[4]}
            />    
        </div>
    )
}

export default TablaCodigosPostales
