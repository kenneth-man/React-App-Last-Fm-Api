import React, { useContext } from 'react';
import { Context } from '../Context';
import Row from './Row';
import Column from './Column';
import { Typography } from '@mui/material';
import CommonInput from './CommonInput';
import CommonButton from './CommonButton';
import SearchIcon from '@mui/icons-material/Search';
import { h1MediaQ, inputMediaQ } from '../data/mediaQueryData';

const Searchbar = ({ heading, query, searchState, setSearchState, setDataState, setPageNumState, setPageTotalState, setIsCalcTotalState }) => {
    const { fetchFirstPage, calcPageTotal } = useContext(Context);

    //fetch first page based on search string inputted, re-calculate total number of pages and reset local 'pageNumber' state to 1
    const searchBtnOnClick = async () => {
        await fetchFirstPage(false, query, searchState, setDataState);
        calcPageTotal(query, searchState, setPageTotalState, setIsCalcTotalState); 
        setPageNumState(1);
    }

    return <Column
        justifyContent='space-evenly'
        sx={{ 
            width: '100%', 
            minHeight: '250px', 
            backgroundColor: 'rgba(0,0,0,0.2)'
        }}
    >
        <Typography
            variant='h3'
            component='h1'
            color='white'
            sx={h1MediaQ}
        >
            Search for a {heading}
        </Typography>
        <Row sx={{ flexDirection: { xs:'column', md:'row' } }}>
            <CommonInput
                placeHolder={`Please type in the ${heading} name...`}
                type='text'
                colour='secondary'
                state={searchState}
                setState={setSearchState}
                sx={{ 
                    marginRight: { xs:'0px', md:'20px' }, 
                    marginBottom: { xs:'20px', md:'0px' },
                    ...inputMediaQ 
                }}
            />
            <CommonButton
                onClick={searchBtnOnClick}
                text='search'
                endIcon={<SearchIcon/>}
                sx={{ paddingY: '8px'}}
            />
        </Row>
    </Column>
}

export default Searchbar;