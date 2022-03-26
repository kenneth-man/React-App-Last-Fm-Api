import React from 'react';
import { Button } from '@mui/material';

const CommonButton = ({ onClick, text, startIcon, endIcon, type, sx }) => {
    return <Button
        onClick={onClick}
        color='secondary'
        variant='contained'
        startIcon={startIcon}
        endIcon={endIcon}
        type={type}
        sx={{
            color: 'white',
            backgroundColor: 'primary',
            ...sx
        }}
    >
        {text}    
    </Button>
}

export default CommonButton;