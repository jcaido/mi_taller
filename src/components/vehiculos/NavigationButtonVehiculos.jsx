import React, { useState, useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';


const NavigationButtonVehiculos = () => {

    const { 
        nuevoVehiculoFormDispatch, 
        buscarVehiculoFormDispatch,
        editarVehiculoFormDispatch, 
        eliminarVehiculoFormDispatch 
    } = useContext(DatosGeneralesFormContext);
    
    function handleClickNuevoVehiculoForm() {
        nuevoVehiculoFormDispatch();
    }

    function handleClickBuscarVehiculoForm() {
        buscarVehiculoFormDispatch();
    }
    
    function handleClickEditarVehiculoForm() {
        editarVehiculoFormDispatch();
    }

    function handleClickEliminarVehiculoForm() {
        eliminarVehiculoFormDispatch();
    }   

    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={value} onChange={handleChange}>
            <Tooltip title="Crear vehiculo">
                <BottomNavigationAction
                label="Nuevo"
                value="nuevo"
                icon={<PlaylistAddIcon/>}
                onClick={handleClickNuevoVehiculoForm}
                />
            </Tooltip>
            <Tooltip title="Buscar vehiculos">
                <BottomNavigationAction
                    label="Buscar"
                    value="buscar"
                    icon={<FindInPageIcon/>}
                    onClick={handleClickBuscarVehiculoForm}
                />
            </Tooltip>
            <Tooltip title="Editar vehiculo">
                <BottomNavigationAction
                    label="Editar"
                    value="editar"
                    icon={<CreateIcon/>}
                    onClick={handleClickEditarVehiculoForm}
                />        
            </Tooltip>
            <Tooltip title="Eliminar vehiculo">
                <BottomNavigationAction
                    label="Eliminar"
                    value="eliminar"
                    icon={<DeleteIcon/>}
                    onClick={handleClickEliminarVehiculoForm}
                />
            </Tooltip>
       </BottomNavigation>
    )
}

export default NavigationButtonVehiculos
