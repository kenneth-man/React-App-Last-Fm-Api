import React from 'react';
import { TextField } from '@mui/material';

const CommonInput = ({ placeHolder, type, label, colour, state, setState, sx }) => {
    return <TextField
        placeholder={placeHolder}
        type={type}
        label={label}
        color={colour}
        value={state}
        onChange={e => setState(e.target.value)}
        variant='outlined'
        size='small'
        sx={{
            color: 'white',
            backgroundColor: 'white',
            borderRadius: '5px',
            width: '400px',
            ...sx
        }}
    />
}

export default CommonInput;