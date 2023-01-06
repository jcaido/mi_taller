import React from 'react';
import NavBar from '../components/NavBar';
import { Box, Grid } from '@mui/material';
import { Outlet} from 'react-router-dom';

const Taller = () => {

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <NavBar
                        pages = {['INICIO', 'DATOS GENERALES', 'FACTURACION', 'CONTABILIDAD']}
                        pagina = "TALLER"
                    />
                </Box>
            </Grid>
            <Outlet/>
        </Grid>
        
    )
}

export default Taller
