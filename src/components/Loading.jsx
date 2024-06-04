import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'block',
        margin: '60px auto',
        width: '60px !important',
        height: '60px !important',
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <>
            <CircularProgress color="primary" className={ classes.loading } />
        </>
    )
}