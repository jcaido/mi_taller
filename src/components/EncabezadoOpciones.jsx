import React from 'react';
import { Box } from '@mui/material';

function EncabezadoOpciones({ titulo, fontSize }) {
  return (
    <Box
      border={1}
      borderColor="grey.300"
      color="text.secondary"
      textAlign="center"
      fontSize={fontSize}
      mb={8}
      p={6}
      boxShadow={5}
    >
      {titulo}
    </Box>
  );
}

export default EncabezadoOpciones;
