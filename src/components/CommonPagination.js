import React, { useContext } from 'react';
import { Context } from '../Context';
import { Pagination, Paper } from '@mui/material';

const CommonPagination = ({ pageTotalState, pageNumState, pageNumSetState, sx }) => {
    const { scrollToTop } = useContext(Context);

    //set local 'pageNumber' state to whichever page number that was clicked; triggers useEffect in respective page
    const handleOnChange = (event, value) => {
        pageNumSetState(value);
        scrollToTop();
    }

    return <Paper 
        elevation={3}
        sx={{
            '& ul': {
                justifyContent: {
                    xs:'center',
                    sm:'initial'
                } 
            },
            '& li': {
                marginBottom: {
                    xs:'10px',
                    sm:'0px'
                }
            },
            padding: {
                xs:'10px',
                sm:'12.5px'
            },
            paddingBottom: {
                xs:'0px',
                sm:'12.5px'
            },
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            ...sx
        }}
    >
        <Pagination 
            count={pageTotalState} 
            variant='outlined' 
            shape='rounded'
            color='primary'
            page={pageNumState}
            onChange={handleOnChange}
        />
    </Paper>
}

export default CommonPagination;