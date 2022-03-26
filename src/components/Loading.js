import React from 'react';
import Row from './Row';
import { Typography } from '@mui/material';
import loadingGif from '../res/images/loading.gif';

const Loading = ({ variant, customText, sx }) => {
    return <Row 
        sx={{
            margin: 'auto',
            ...sx
        }}
    >
        <Typography 
            variant={variant ? 'h5' : 'h3'} 
            component='h1'
            color='white'
        >
            {customText ? customText : 'Loading data...'}
        </Typography>
        &nbsp;
        <img src={loadingGif} alt='loading-gif' style={variant && { height:'20px' }}/>
    </Row>
}

export default Loading;