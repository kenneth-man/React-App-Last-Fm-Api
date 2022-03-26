import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import Row from '../components/Row';
import Result from '../components/Result';
import ResultsGridContainer from '../components/ResultsGridContainer';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Tag from '../components/Tag';
import background from '../res/images/last-fm-background5.jpg';
import { Typography } from '@mui/material';
import { h1MediaQ, h2MediaQ } from '../data/mediaQueryData';
import { infoTypes } from '../data/tagData';

const TagPage = () => {
    const { fetchTagData, tagQuery, isLoading, setIsLoading } = useContext(Context);
    const [tagData, setTagData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchTagData(tagQuery, infoTypes, setTagData);
    }, [])

    useEffect(() => 
        tagData.length === 5 &&
        setIsLoading(false)
    , [tagData])

    return <Page
        extraClasses='space-y-40'
        sx={{
            paddingY: '100px', 
            paddingX: { xs: '25px', sm: '50px' }  
        }}
        backgroundImage={background}
    >
        {
            isLoading ?
            <Loading/> :
            (
                tagData.length > 0 ?
                <>
                    {
                        tagData.map((tagDataSingle, index) => 
                            <Column
                                key={index}
                                extraClasses='space-y-10'
                                sx={{ width: '100%' }}
                            >
                                <Typography
                                    variant='h3'
                                    component='h1'
                                    color='white'
                                    sx={h1MediaQ}
                                >
                                    {tagDataSingle.title}
                                </Typography>
                                {
                                    tagDataSingle.componentType === 'tag' ?
                                    <Row
                                        sx={{ 
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        {
                                            tagDataSingle.data.tag.length > 0 ?
                                            tagDataSingle.data.tag.map((curr, index)=> 
                                                <Tag
                                                    key={index}
                                                    sx={{ marginRight: '10px', marginBottom: '10px' }}
                                                >
                                                    {curr.name}
                                                </Tag>
                                            ) :
                                            <NoData/>
                                        }
                                    </Row> :
                                    (
                                        tagDataSingle.componentType === 'result' ?
                                        <ResultsGridContainer>
                                            {
                                                tagDataSingle.data.artist ?
                                                tagDataSingle.data.artist.map((curr, index) => 
                                                    <Result
                                                        key={index}
                                                        data={curr}
                                                        query='artist'
                                                        artist={curr.name} 
                                                    />
                                                ) :
                                                tagDataSingle.data.album.map((curr, index) => 
                                                    <Result
                                                        key={index}
                                                        data={curr}
                                                        query='album'
                                                        artist={curr.artist.name}
                                                        album={curr.name}
                                                    />
                                                )
                                            }
                                        </ResultsGridContainer> :
                                        <Column
                                            extraClasses='space-y-4'
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                                color='white'
                                                sx={h2MediaQ}
                                            >
                                                {`${tagDataSingle.data.name.charAt(0).toUpperCase()}${tagDataSingle.data.name.slice(1)}`} 
                                                &nbsp;
                                                &ndash;
                                                &nbsp;
                                                {tagDataSingle.data.reach.toLocaleString()} Listens
                                            </Typography>
                                            <Typography
                                                variant='subtitle1'
                                                component='p'
                                                color='white'
                                                sx={{ textAlign: 'start', wordBreak: 'break-word' }}
                                            >
                                                {tagDataSingle.data.wiki.content}
                                            </Typography>
                                        </Column>
                                    )
                                }
                            </Column>
                        )
                    }
                </> :
                <NoData/>
            )
        }
    </Page>
}

export default TagPage;