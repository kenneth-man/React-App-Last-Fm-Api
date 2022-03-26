import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
import Column from './Column';
import { Typography, Paper, Grid } from '@mui/material';
import { h2MediaQ } from '../data/mediaQueryData';
import lastFmLogo from '../res/images/last-fm-logo.png';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const Result = ({ data, query, artist, album, track, isOnProfile }) => {
    const { setDetailsParams, removeFromSavedItems } = useContext(Context);
    const [isModalShown, setIsModalShown] = useState(false);
    const navigate = useNavigate();
    const resultParams = [
        { artist }, 
        { album }, 
        { track }
    ]

    const toggleIsModalShown = () => setIsModalShown(!isModalShown);

    const resultOnClick = () => {
        const truthyResultParams = resultParams.filter(curr => {
            //'curr' objects have different property names 'artist', 'album', 'track'; checking if value is truthy without needing to use property name
            const isTruthyParam = Object.values(curr)[0];
            
            if(isTruthyParam){
                return true;
            } else {
                return false;
            }
        });
        
        setDetailsParams({ query, params: truthyResultParams });
        navigate(`/Details/${data.name}`)
    }

    return <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        lg={3}
        onClick={isOnProfile ? () => removeFromSavedItems(data) : resultOnClick}
    >
        <Paper 
            elevation={3}
            sx={{
                backgroundColor: 'transparent',
                '&:hover': {
                    cursor: 'pointer',
                    filter: 'brightness(150%)'
                }
            }}
        >
            <Column
                justifyContent='space-evenly'
                onMouseOver={isOnProfile && toggleIsModalShown}
                onMouseOut={isOnProfile && toggleIsModalShown}
                sx={{ 
                    position: 'relative',
                    minHeight: { xs:'275px', sm: '300px', md:'325px' },
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${data.artist ? data.image[3]['#text'] : lastFmLogo})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '10px',
                    borderRadius: '5px',
                }}
            >
                <Typography
                    variant='h3'
                    component='h1'
                    color='white'
                    sx={{ fontSize: { xs:'21px', md: '30px' }, fontWeight: '300' }}
                >
                    {data.name}
                </Typography>
                <Typography
                    variant='h5'
                    component='h2'
                    color='white'
                    sx={h2MediaQ}
                >
                    {data.artist ? (data.artist.name ? data.artist.name : data.artist) : `${Number(data.listeners).toLocaleString()} listeners`}
                </Typography>
                {
                    isOnProfile &&
                    <Column
                        justifyContent='space-evenly'
                        sx={{ 
                            position: 'absolute',
                            opacity: isModalShown ? '100%' : '0%',
                            zIndex: isModalShown ? '10' : '-10',
                            height: '100%',
                            width: '100%',
                            paddingX: '20px',
                            backgroundColor: 'rgba(0,0,0,0.95)' 
                        }}
                    >
                        <Typography
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={{ fontSize: { xs:'24px', sm:'30px' } }}
                        >
                            Remove From Saved Items?
                        </Typography>

                        <PlaylistRemoveIcon
                            fontSize='large'
                            style={{ color: 'white' }}
                        />
                    </Column>
                }
            </Column>
        </Paper>
    </Grid>
}

export default Result;