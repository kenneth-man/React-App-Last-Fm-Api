import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Searchbar from '../components/Searchbar';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import ResultsGridContainer from '../components/ResultsGridContainer';
import Result from '../components/Result';
import CommonPaginationContainer from '../components/CommonPaginationContainer';
import background from '../res/images/last-fm-background3.jpg';

const Track = () => {
    const { fetchSearchData, calcPageTotal, fetchFirstPage, initialFetchString, isLoading, setIsLoading } = useContext(Context);
    const [searchbarString, setSearchbarString] = useState(initialFetchString);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);
    const [isCalcPageTotal, setIsCalcPageTotal] = useState(true);
    const [trackData, setTrackData] = useState([]);
    const isInitialRender = useRef(true);
    const verticalMargin = { margin: '200px 0px' };
    
    useEffect(async () => {
        setIsLoading(true);
        
        if(isInitialRender.current){
            calcPageTotal('track', initialFetchString, setPageTotal, setIsCalcPageTotal); 
            fetchFirstPage(true, 'track', false, setTrackData);
            isInitialRender.current = false;
        } else {
            await fetchSearchData('track', searchbarString, setTrackData, pageNumber);
        }
    }, [pageNumber])

    return <Page backgroundImage={background}>
        <Searchbar
            heading='Track'
            query='track'
            searchState={searchbarString}
            setSearchState={setSearchbarString}
            setDataState={setTrackData}
            setPageNumState={setPageNumber}
            setPageTotalState={setPageTotal}
            setIsCalcTotalState={setIsCalcPageTotal}
        />
        <CommonPaginationContainer
            isCalcPageTotalState={isCalcPageTotal}
            pageTotalState={pageTotal}
            pageNumState={pageNumber}
            pageNumSetState={setPageNumber}
        >
            <ResultsGridContainer>
                {
                    isLoading ?
                    <Loading sx={verticalMargin}/> :
                    (
                        trackData.length > 0 ?
                        trackData.map((curr, index) => 
                            <Result     
                                key={index}
                                data={curr}
                                query='track'
                                artist={curr.artist}
                                track={curr.name}
                            />    
                        ) :
                        <NoData sx={verticalMargin}/>
                    )
                }
            </ResultsGridContainer>
        </CommonPaginationContainer>
    </Page>
}

export default Track;