import React from 'react';
import { Box } from '@mui/material';

const Column = ({ children, justifyContent, extraClasses, onMouseOver, onMouseOut, sx }) => {
    return <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent={justifyContent}
        className={extraClasses}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        sx={sx}
    >
        {children}
    </Box>
}

export default Column;