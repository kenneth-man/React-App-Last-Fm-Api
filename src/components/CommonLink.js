import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const CommonLink = ({ route, text, colour, sx }) => {
    return <Link to={route} className='Link' style={{color: colour}}>
        <Typography 
            variant='subtitle1' 
            component='h3'
            color={colour}
            sx={sx}
        >
            {text}
        </Typography>
    </Link>
}

export default CommonLink;