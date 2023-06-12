import React from 'react';
import { CircularProgress } from '@mui/material';

function Loader({size,color}) {
    return (
        <div>
            <CircularProgress size={size} color={color}/>
        </div>
    )
}

export default Loader;
