import React from 'react';
import { Grid } from '@mui/material';

const ResultsGridContainer = ({ children, extraClasses, sx }) => {
    return <Grid
        container
        spacing={3}
        className={extraClasses}
        sx={{
            flex: '1',
            ...sx
        }}
    >
        {children}
    </Grid>
}

export default ResultsGridContainer;