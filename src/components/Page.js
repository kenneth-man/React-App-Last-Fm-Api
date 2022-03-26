import React from 'react';
import { Box } from '@mui/material';

const Page = ({ children, justifyContent, backgroundImage, backgroundGradient, extraClasses, sx }) => {
    return <Box
        display='flex'
        flex='1'
        flexDirection='column'
        alignItems='center'
        justifyContent={justifyContent}
        width='100%'
        className={`Page ${extraClasses}`}
        sx={{ 
            overflowY: 'scroll',
            overflowX: 'hidden', 
            backgroundImage: `linear-gradient(${backgroundGradient ? backgroundGradient : 'rgba(0,0,0,1), rgba(0,0,0,0.1)'}), url(${backgroundImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '25px',
            ...sx 
        }}
    >
        {children}    
    </Box>
}

export default Page;