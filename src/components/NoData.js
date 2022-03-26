import React from 'react';
import Row from './Row';
import { Typography } from '@mui/material';
import { h1MediaQ } from '../data/mediaQueryData';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NoData = ({ sx }) => {
    return <Row
        sx={{ 
            margin: 'auto',
            ...sx 
        }}
    >
        <Typography
            variant='h3'
            component='h1'
            color='white'
            sx={{h1MediaQ}}
        >
            No Data Found...
        </Typography>
        &nbsp;
        <SentimentDissatisfiedIcon 
            sx={{
                fontSize: '50px', 
                color: 'white'
            }}
        />
    </Row>
}

export default NoData;