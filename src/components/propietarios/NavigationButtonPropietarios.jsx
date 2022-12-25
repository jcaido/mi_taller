import React, { useState, useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';


const NavigationButtonPropietarios = () => {

    const { 
        nuevoPropietarioFormDispatch, 
        buscarPropietarioFormDispatch,
        buscarPropietarioParaEditarDispatch, 
        buscarPropietarioParaEliminarDispatch 
    } = useContext(DatosGeneralesFormContext);


    const [value, setValue] = useState('nuevo');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={value} onChange={handleChange}>
            <Tooltip title="crear propietario">
                <BottomNavigationAction
                    label="Nuevo"
                    value="nuevo"
                    icon={<PlaylistAddIcon/>}
                    onClick={ nuevoPropietarioFormDispatch }
                />
            </Tooltip>
            <Tooltip title="buscar propietarios">
                <BottomNavigationAction
                    label="Buscar"
                    value="buscar"
                    icon={<FindInPageIcon/>}
                    onClick={ buscarPropietarioFormDispatch }
                />
            </Tooltip>
            <Tooltip title="editar propietario">
                <BottomNavigationAction
                    label="Editar"
                    value="editar"
                    icon={<CreateIcon/>}
                    onClick={ buscarPropietarioParaEditarDispatch }
                />
            </Tooltip>
            <Tooltip title="eliminar propietario">
                <BottomNavigationAction
                    label="Eliminar"
                    value="eliminar"
                    icon={<DeleteIcon/>}
                    onClick={ buscarPropietarioParaEliminarDispatch }
                />
            </Tooltip>    
        </BottomNavigation>
    )
}

export default NavigationButtonPropietarios
