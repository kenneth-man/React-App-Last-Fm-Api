import React from 'react';
import Column from './Column';
import { Grid, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Features = ({ data }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const featuresContentStyles = {
        height: '400px',
        width: { xs:'100%', md:'90%' },
        objectFit: 'cover',
        backgroundImage: { 
            xs:'linear-gradient(to bottom, rgba(255,0,0,0.8), rgba(255,0,0,0.01))', 
            md:'none' 
        }
    }

    const centerStyles = { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
    }

    return <Grid 
        container
        direction={md ? 'row' : 'column'}
        spacing={3}
    >
        {
            data.map((curr, index) =>
                <Grid 
                    key={index}
                    item 
                    xs={0}
                    md={6}
                    sx={centerStyles}
                >
                    {
                        curr.image ?
                        <Box
                            component='img'
                            alt='feature-image'
                            src={curr.image}
                            sx={{...featuresContentStyles, ...centerStyles}}
                        /> :
                        <Column
                            sx={{...featuresContentStyles, ...centerStyles, paddingX: '30px'}}
                        >
                            <Typography 
                                variant='h3'
                                component='h2'
                                color='white'
                                sx={{ marginBottom: '20px', fontSize: '21px' }}
                            >
                                {curr.heading}
                            </Typography>
                            <Typography
                                variant='h6'
                                component='p'
                                color='white'
                                className='p'
                                sx={{ textAlign: 'start' }}
                            >
                                {curr.text}
                            </Typography>
                        </Column>
                    }
                </Grid>
            )
        }
    </Grid>
}

export default Features;