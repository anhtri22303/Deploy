import Grid from '@mui/material/Grid';
import React from 'react';
import IngredientTable from './IngredientTable';

export default function Ingredients() {
    return (
        <div className='px-2'>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <IngredientTable/>
                </Grid>
            </Grid>
        </div>
    )
}
