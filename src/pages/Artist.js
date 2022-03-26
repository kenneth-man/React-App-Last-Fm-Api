import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Searchbar from '../components/Searchbar';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import ResultsGridContainer from '../components/ResultsGridContainer';
import Result from '../components/Result';
import CommonPaginationContainer from '../components/CommonPaginationContainer';
import background from '../res/images/last-fm-background4.jpg';

const Artist = () => {
    const { fetchSearchData, calcPageTotal, fetchFirstPage, initialFetchString, isLoading, setIsLoading } = useContext(Context);
    const [searchbarString, setSearchbarString] = useState(initialFetchString);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);
    const [isCalcPageTotal, setIsCalcPageTotal] = useState(true);
    const [artistData, setArtistData] = useState([]);
    const isInitialRender = useRef(true);
    const verticalMargin = { margin: '200px 0px' };

    useEffect(async () => {
        setIsLoading(true);
        
        if(isInitialRender.current){
            calcPageTotal('artist', initialFetchString, setPageTotal, setIsCalcPageTotal); 
            fetchFirstPage(true, 'artist', false, setArtistData);
            isInitialRender.current = false;
        } else {
            await fetchSearchData('artist', searchbarString, setArtistData, pageNumber);
        }
    }, [pageNumber])

    return <Page backgroundImage={background}>
        <Searchbar
            heading='Artist'
            query='artist'
            searchState={searchbarString}
            setSearchState={setSearchbarString}
            setDataState={setArtistData}
            setPageNumState={setPageNumber}
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
                        artistData.length > 0 ?
                        artistData.map((curr, index) => 
                            <Result 
                                key={index}
                                data={curr}
                                query='artist'
                                artist={curr.name}
                            />    
                        ) :
                        <NoData sx={verticalMargin}/>
                    )
                }
            </ResultsGridContainer>
        </CommonPaginationContainer>
    </Page>
}

export default Artist;