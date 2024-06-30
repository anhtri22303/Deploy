import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
export const EventCard = ()=> {
  return (
    <div>
      <Card sx={{width:345}}>
        <CardMedia 
        sx={{height:345}}
        image='https://cdn.pnj.io/images/promo/210/disney-t6-24-540x270.png'/>
        <CardContent>
            <Typography variant='h5'>
                WeddingDay
            </Typography>
            <Typography variant='body2'>
                50% off on your day
            </Typography>
            <div>
              <p>{'mumbai'}</p>
              <p className='text-sm text-blue-600'>February 14, 2024 12:00 AM</p>
              <p className='text-sm text-red-600'>February 15, 2024 12:00 PM</p>
            </div>
        </CardContent>
       {false&& <CardActions>
          <IconButton>
              <DeleteIcon/>
          </IconButton>
        </CardActions>}
      </Card>
    </div>
  )
}
