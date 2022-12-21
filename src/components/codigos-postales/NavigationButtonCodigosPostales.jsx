import React, { useState, useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';


const NavigationButtonCodigosPostales = () => {

    const { 
        nuevoCodigoPostalFormDispatch, 
        buscarCodigoPostalFormDispatch,
        buscarCodigoPostalParaEditarDispatch, 
        buscarCodigoPostalParaEliminarDispatch 
    } = useContext(DatosGeneralesFormContext);

    const [value, setValue] = useState('nuevo');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={value} onChange={handleChange}>
            <Tooltip title="Crear codigo postal">
                <BottomNavigationAction
                    label="Nuevo"
                    value="nuevo"
                    icon={<PlaylistAddIcon/>}
                    onClick={ nuevoCodigoPostalFormDispatch}
                />
            </Tooltip>
            <Tooltip title="Buscar codigos postales">
                <BottomNavigationAction
                    label="Buscar"
                    value="buscar"
                    icon={<FindInPageIcon/>}
                    onClick={ buscarCodigoPostalFormDispatch }
                />
            </Tooltip>
            <Tooltip title="editar codigo postal">
                <BottomNavigationAction
                    label="Editar"
                    value="editar"
                    icon={<CreateIcon/>}
                    onClick={ buscarCodigoPostalParaEditarDispatch }
                />
            </Tooltip>
            <Tooltip title="eliminar codigo postal">
               <BottomNavigationAction
                    label="Eliminar"
                    value="eliminar"
                    icon={<DeleteIcon/>}
                    onClick={buscarCodigoPostalParaEliminarDispatch }
                /> 
            </Tooltip>    
        </BottomNavigation>
    )
}

export default NavigationButtonCodigosPostales
