import React from 'react';
import Column from './Column';
import { Grid, Typography, Box } from '@mui/material';
import Tag from './Tag';
//use 'useMediaQuery' if you need to calc the current screen size programmatically e.g. whether to render some jsx over another
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Showcase = ({ data }) => {
    //breakpoints only work in mui if chrome dev tools are 100% zoom
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    //could have just used 'sx' prop breakpoints without 'useMediaQuery', but since 'Grid' has a 'direction' prop, just doing for practice
    return <Grid 
        container 
        spacing={md ? 0 : 3} 
        direction={md ? 'row' : 'column'}
        sx={{ justifyContent: 'space-evenly' }}
    >
        {
            data.map((curr, index) => 
                <Grid 
                    key={index}
                    item 
                    xs={3.5}
                >
                    <Column 
                        justifyContent='end'
                        sx={{
                            alignItems: 'flex-start',
                            height: '250px', 
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)),url(${curr.image})`,
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            padding: '10px'
                        }}
                    >
                        <Tag sx={{ marginBottom: '10px' }}>
                            Showcase
                        </Tag>
                        <a href={curr.href} alt={`${curr.heading}-link`} className='Link' style={{ color: 'white' }}>
                            <Typography 
                                variant='h5' 
                                component='h2' 
                                sx={{ textAlign:'start' }}
                            >
                                {curr.heading}
                            </Typography>    
                        </a>
                    </Column>   
                </Grid>
            )
        }
    </Grid>
}

export default Showcase;