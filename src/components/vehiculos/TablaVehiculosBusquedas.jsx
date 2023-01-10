import React from 'react';
import { DataGrid }  from '@mui/x-data-grid';

const columns = [

    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'matricula', headerName: 'Matricula', width: 90 },
    { field: 'marca', headerName: 'Marca', width: 90 },
    { field: 'modelo', headerName: 'Modelo',  width: 90 },
    { field: 'propietarioDni', headerName: 'Propietario', width: 100 }
]

const TablaVehiculosBusquedas = ({ lista }) => {

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
                rows={ lista }
                columns={columns}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            marca: false,
                            modelo: false
                        }
                    },
                    sorting: {
                        sortModel: [{field: 'id', sort: 'desc'}]
                    }
                }}
                pageSize={4}
                rowsPerPageOptions={[4]}                                
            />
        </div>
    )
}

export default TablaVehiculosBusquedas
