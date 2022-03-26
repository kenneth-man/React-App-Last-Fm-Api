import React from 'react';
import { Button } from '@mui/material';

const CommonClearButton = ({ children, onClick, type, sx }) => {
    return <Button
        onClick={onClick}
        type={type}
        sx={{
            backgroundColor: 'transparent',
            padding: '0px',
            minWidth: 'max-content',
            ...sx
        }}
    >
        {children}
    </Button>
}

export default CommonClearButton;