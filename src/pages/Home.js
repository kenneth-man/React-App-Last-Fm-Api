import React from 'react';
import Page from '../components/Page';
import Column from '../components/Column';
import Showcase from '../components/Showcase';
import Features from '../components/Features';
import { Typography } from '@mui/material';
import background from '../res/images/last-fm-background2.jpg';
import { h1MediaQ } from '../data/mediaQueryData';
import { homeShowcaseData, homeFeaturesData } from '../data/homeData';

const Home = () => {
    return <Page 
        backgroundImage={background} 
        extraClasses='space-y-40'
        sx={{ paddingTop: { xs:'5rem', md: '10rem' } }}
    >
        <Column extraClasses='space-y-10'>
            <Typography 
                variant='h3' 
                component='h1' 
                color='white'
                sx={h1MediaQ}
            >
                Welcome to the Last FM  API Tracker
            </Typography>
            <Showcase data={homeShowcaseData}/>
        </Column>
        <Column extraClasses='space-y-10'>
            <Typography 
                variant='h3' 
                component='h1' 
                color='white'
                sx={h1MediaQ}
            >
                Discover the Latest Artists or Albums!
            </Typography>
            <Features data={homeFeaturesData}/>
        </Column>
    </Page>
}

export default Home;