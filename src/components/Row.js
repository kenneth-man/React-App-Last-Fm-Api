import React from 'react';
import { Box } from '@mui/material';

const Row = ({ children, justifyContent, extraClasses, sx }) => {
    return <Box 
        display='flex' 
        alignItems='center' 
        justifyContent={justifyContent}
        className={extraClasses}
        sx={sx}
    >
        {children}
    </Box>
}

export default Row;