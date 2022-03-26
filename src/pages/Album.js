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

const Album = () => {
    const { fetchSearchData, calcPageTotal, fetchFirstPage, initialFetchString, isLoading, setIsLoading } = useContext(Context);
    const [searchbarString, setSearchbarString] = useState(initialFetchString);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);
    const [isCalcPageTotal, setIsCalcPageTotal] = useState(true);
    const [albumData, setAlbumData] = useState([]);
    const isInitialRender = useRef(true);
    const verticalMargin = { margin: '200px 0px' };
    
    useEffect(async () => {
        setIsLoading(true);
        
        if(isInitialRender.current){
            calcPageTotal('album', initialFetchString, setPageTotal, setIsCalcPageTotal); 
            fetchFirstPage(true, 'album', false, setAlbumData);
            isInitialRender.current = false;
        } else {
            await fetchSearchData('album', searchbarString, setAlbumData, pageNumber);
        }
    }, [pageNumber])

    return <Page backgroundImage={background}>
        <Searchbar
            heading='Album'
            query='album'
            searchState={searchbarString}
            setSearchState={setSearchbarString}
            setDataState={setAlbumData}
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
                        albumData.length > 0 ?
                        albumData.map((curr, index) => 
                            <Result 
                                key={index}
                                data={curr}
                                query='album'
                                artist={curr.artist}
                                album={curr.name}
                            />    
                        ) :
                        <NoData sx={verticalMargin}/>
                    )
                }
            </ResultsGridContainer>
        </CommonPaginationContainer>
    </Page>
}

export default Album;