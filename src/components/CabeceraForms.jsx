import React from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function CabeceraForms({ label }) {
  return (
    <Box>
      <Divider>
        <Chip label={label} />
      </Divider>
    </Box>
  );
}

export default CabeceraForms;
