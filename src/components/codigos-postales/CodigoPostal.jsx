import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const CodigoPostal = () => {

    const {state} = useContext(DatosGeneralesFormContext);

    return (
        <Box m={3}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        CODIGO: {state.codigoPostalPorCodigo && state.listaCodigosPostalesPorCodigo.codigo}
                                {state.codigoPostalPorLocalidad && state.listaCodigosPostalesPorLocalidad.codigo}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        LOCALIDAD: { state.codigoPostalPorCodigo && state.listaCodigosPostalesPorCodigo.localidad }
                                    {state.codigoPostalPorLocalidad && state.listaCodigosPostalesPorLocalidad.localidad}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        PROVINCIA:  { state.codigoPostalPorCodigo && state.listaCodigosPostalesPorCodigo.provincia }
                                    { state.codigoPostalPorLocalidad && state.listaCodigosPostalesPorLocalidad.provincia }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CodigoPostal
