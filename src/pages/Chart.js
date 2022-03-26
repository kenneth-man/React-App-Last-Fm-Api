import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import ResultsGridContainer from '../components/ResultsGridContainer';
import Result from '../components/Result';
import Tag from '../components/Tag';
import Column from '../components/Column';
import Row from '../components/Row';
import { Typography } from '@mui/material';
import { infoTypes } from '../data/chartData';
import background from '../res/images/last-fm-background5.jpg';
import { h1MediaQ } from '../data/mediaQueryData';

const Chart = () => {
    const { isLoading, setIsLoading, fetchChartData } = useContext(Context);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchChartData(infoTypes, setChartData);
    }, [])  

    return <Page 
        extraClasses='space-y-20'
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
                chartData.length > 0 ?
                chartData.map((curr, index) => 
                    <Column
                        key={index}
                    >
                        <Typography
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={{
                                marginBottom: '10px',
                                ...h1MediaQ
                            }}
                        >
                            {curr.title}
                        </Typography>

                        {
                            curr.componentType === 'result' ?
                            <ResultsGridContainer>
                                {
                                    curr.data.artist ?
                                    curr.data.artist.map((currArtist, artistIndex) =>
                                        <Result
                                            key={artistIndex}
                                            data={currArtist}
                                            query='artist'
                                            artist={currArtist.name}
                                        />
                                    ) :
                                    curr.data.track.map((currTrack, trackIndex) => 
                                        <Result
                                            key={trackIndex}
                                            data={currTrack}
                                            query='track'
                                            artist={currTrack.artist.name}
                                            track={currTrack.name}
                                        />
                                    )
                                }
                            </ResultsGridContainer> :
                            <Row
                                sx={{ flexWrap: 'wrap' }}
                            >
                                {
                                    curr.data.tag.map((currTag, tagIndex) => 
                                        <Tag
                                            key={tagIndex}
                                            text={currTag.name}
                                            sx={{
                                                marginRight: '10px',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            {currTag.name}
                                        </Tag>
                                    )
                                }
                            </Row>
                        }
                    </Column>
                ) :
                <NoData/>
            )
        }
    </Page>
}

export default Chart;