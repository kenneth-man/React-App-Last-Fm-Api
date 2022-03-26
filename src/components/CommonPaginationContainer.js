import React from 'react';
import Loading from './Loading';
import CommonPagination from './CommonPagination';
import Column from './Column';

//so i don't have to repeat the same components for each page that has searching functionality with pagination
const CommonPaginationContainer = ({ children, isCalcPageTotalState, pageTotalState, pageNumState, pageNumSetState }) => {
    return <Column>
        {
            isCalcPageTotalState ?
            <Loading
                variant={true}
                customText='Loading Pagination...'
                sx={{
                    margin: '50px 0px'
                }}
            /> :
            <CommonPagination
                pageTotalState={pageTotalState}
                pageNumState={pageNumState}
                pageNumSetState={pageNumSetState}
                sx={{
                    margin: '50px 0px'
                }}
            />
        }

        {children}

        {
            isCalcPageTotalState ?
            <Loading
                variant={true}
                customText='Loading Pagination...'
                sx={{
                    marginTop: '50px',
                    marginBottom: '25px',
                }}
            /> :
            <CommonPagination
                pageTotalState={pageTotalState}
                pageNumState={pageNumState}
                pageNumSetState={pageNumSetState}
                sx={{
                    marginTop: '50px',
                    marginBottom: '25px',
                }}
            />
        }
    </Column>
}

export default CommonPaginationContainer;