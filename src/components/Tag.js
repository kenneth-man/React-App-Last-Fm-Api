import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Tag = ({ children, text, sx }) => {
    const { setTagQuery } = useContext(Context);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    const tagOnClick = () => {
        setTagQuery(text);
        setShouldNavigate(true);
    }

    useEffect(() => 
        shouldNavigate &&
        navigate(`/Tag/${text}`)
    , [shouldNavigate])

    return <Box
        sx={{
            backgroundColor: 'rgb(255,0,0,0.8)',
            padding: '1px 8px',
            borderRadius: '50px',
            '&:hover': {
                cursor: 'pointer'
            },
            ...sx
        }}
        onClick={tagOnClick}
    >
        <Typography
            variant='subtitle2'
            component='h3'
            color='white'
            sx={{ 
                textTransform: 'uppercase', 
                fontWeight: '500',
                whiteSpace: 'nowrap' 
            }}
        >
            {children}
        </Typography>
    </Box>
}

export default Tag;