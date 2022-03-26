import React from 'react';
import Page from '../components/Page';
import { Typography } from '@mui/material';
import background from '../res/images/last-fm-background.jpg';
import { h1MediaQ, h2MediaQ } from '../data/mediaQueryData';

const Page404 = () => {
    return <Page 
        justifyContent='center'
        backgroundImage={background}
        extraClasses='space-y-10'
    >
        <Typography
            variant='h3'
            component='h1'
            color='white'
            sx={h1MediaQ}
        >
            404 Page Not Found...
        </Typography>
        <Typography
            variant='h5'
            component='h2'
            color='white'
            sx={h2MediaQ}
        >
            The page you are searching for does not exist
        </Typography>
    </Page>
}

export default Page404;