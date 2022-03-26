import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import Row from '../components/Row';
import NoData from '../components/NoData';
import CommonButton from '../components/CommonButton';
import Tag from '../components/Tag';
import { Typography } from '@mui/material';
import { h1MediaQ, h2MediaQ } from '../data/mediaQueryData';
import background from '../res/images/last-fm-background.jpg';
import Loading from '../components/Loading';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';

const Details = () => {
    const { fetchInfoData, detailsParams, isLoading, setIsLoading, readDocumentWoId, readDocumentOnSnapshot, updateDocument, removeFromSavedItems } = useContext(Context);
    const [detailsData, setDetailsData] = useState(undefined);
    const [currUserData, setCurrUserData] = useState(undefined);
    const [isAlreadySaved, setIsAlreadySaved] = useState(false);

    //format numbers into thousands
    const formatNumber = inputNum => Number(inputNum).toLocaleString(); 

    const saveUnsaveOnClick = async () => {
        let savedItemsUpdated;

        if(isAlreadySaved){
            removeFromSavedItems(detailsData);
        } else {
            savedItemsUpdated = currUserData.savedItems;
            savedItemsUpdated.push(detailsData);
        }

        await updateDocument('users', currUserData.id, 'savedItems', savedItemsUpdated);
        setIsAlreadySaved(!isAlreadySaved);
    }

    //fetching more detailed info about the 'Result' clicked from API
    useEffect(async () => {
        if(detailsParams){
            setIsLoading(true);
            await fetchInfoData(detailsParams.query, detailsParams.params, setDetailsData);
        }
    }, [detailsParams])

    //fetch currently signed in user's document data from firebase
    useEffect(async () => {
        setIsLoading(true);
        const currUser = await readDocumentWoId('users');
        readDocumentOnSnapshot('users', currUser[0].id, setCurrUserData);
        setIsLoading(false);
    }, [])

    useEffect(() => {
        if(currUserData && detailsData){
            const isAlreadySaved = currUserData.savedItems.find(curr => 
                curr.mbid ?
                curr.mbid === detailsData.mbid :
                curr.name === detailsData.name
            )

            isAlreadySaved && setIsAlreadySaved(true);
        }
    }, [currUserData, detailsData])

    return <>
        {
            isLoading ?
            <Page 
                backgroundImage={background}
                backgroundGradient='rgba(0,0,0,0.8),rgba(0,0,0,0.8)'
                sx={{ 
                    paddingY: '100px'
                }}
            >
                <Loading/>
            </Page> :
            (
                detailsData ?
                <Page 
                    backgroundImage={detailsData.artist && detailsData.image ? detailsData.image[4]['#text'] : background}
                    backgroundGradient='rgba(0,0,0,0.8),rgba(0,0,0,0.8)'
                    extraClasses='space-y-20'
                    sx={{ 
                        backgroundRepeat : 'repeat', 
                        backgroundSize: 'unset', 
                        paddingY: '100px'
                    }}
                >
                
                    <Column
                        extraClasses='space-y-8'
                    >
                        <Typography
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={h1MediaQ}
                        >
                            {detailsData.name}
                        </Typography>
                        <Typography
                            variant='h5'
                            component='h2'
                            color='white'
                            sx={h2MediaQ}
                        >
                            {detailsData.artist ? `By ${detailsData.artist.name ? detailsData.artist.name : detailsData.artist}` : `MBID - ${detailsData.mbid}`}
                        </Typography>
                        <Typography
                            variant='h5'
                            component='h2'
                            color='white'
                            sx={h2MediaQ}
                        >
                            {detailsData.stats ? formatNumber(detailsData.stats.listeners) : formatNumber(detailsData.listeners)} listens
                        </Typography>
                        <Typography
                            variant='h5'
                            component='h2'
                            color='white'
                            sx={h2MediaQ}
                        >
                            {detailsData.stats ? formatNumber(detailsData.stats.playcount) : formatNumber(detailsData.playcount)} plays
                        </Typography>
                    </Column>

                    <Column
                        extraClasses='space-y-8'
                    >
                        <Typography
                            variant='h6'
                            component='p'
                            color='white'
                            sx={{ textAlign: 'start', wordBreak: 'break-word', whiteSpace: 'normal', width: { xs:'100%', md:'70%' }}}
                        >
                            {detailsData.wiki ? detailsData.wiki.content : detailsData.bio.content}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            component='p'
                            color='white'
                        >
                            Published {detailsData.wiki ? detailsData.wiki.published : detailsData.bio.published}
                        </Typography>
                    </Column>

                    <Column extraClasses='space-y-8' sx={{ width: '100%'}}>
                        <Typography
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={h1MediaQ}
                        >
                            Related Tags
                        </Typography>
                        <Row 
                            justifyContent='space-evenly'
                            sx={{ 
                                width: {
                                    md:'50%',
                                    lg:'35%'
                                }, 
                                flexDirection: { 
                                    xs:'column', 
                                    md:'row' 
                                } 
                            }}
                        >
                            {
                                detailsData.tags ?
                                detailsData.tags.tag.map((curr,index) => 
                                    <Tag
                                        key={index}
                                        text={curr.name}
                                        sx={{ marginBottom: { xs:'20px', md:'0px' } }}
                                    >
                                        {curr.name}
                                    </Tag> 
                                ) :
                                detailsData.toptags.tag.map((curr,index) => 
                                    <Tag
                                        key={index}
                                        text={curr.name}
                                        sx={{ marginBottom: { xs:'20px', md:'0px' } }}
                                    >
                                        {curr.name}
                                    </Tag> 
                                )
                            }
                        </Row>
                    </Column>

                    <Column extraClasses='space-y-8'>
                        <Typography
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={h1MediaQ}
                        >
                            Save to your profile
                        </Typography>

                        <CommonButton
                            onClick={saveUnsaveOnClick}
                            text={isAlreadySaved ? 'Unsave from Profile' : 'Save to Profile'}
                            endIcon={isAlreadySaved ? <CreditCardOffIcon/> : <AddCardIcon/>}
                        />
                    </Column>
                </Page> :
                <Page 
                    backgroundImage={background}
                    backgroundGradient='rgba(0,0,0,0.8),rgba(0,0,0,0.8)'
                    sx={{ 
                        paddingY: '100px'
                    }}
                >
                    <NoData/>
                </Page>
            )
        }
    </>
}

export default Details;