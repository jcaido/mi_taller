import React, { useContext } from 'react';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import { DataGrid }  from '@mui/x-data-grid';

const columns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 90 },
    { field: 'primerApellido', headerName: '1º apellido', width: 90 },
    { field: 'segundoApellido', headerName: '2º apellido', width: 90 },
    { field: 'dni', headerName: 'DNI', width: 100 },
]

const TablaPropietariosPorPrimerApellido = () => {

    const { state } = useContext(DatosGeneralesFormContext);

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
                rows={state.listaPropietariosPorPrimerApellido}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[4]}                
            />
        </div>
    )
}

export default TablaPropietariosPorPrimerApellido
