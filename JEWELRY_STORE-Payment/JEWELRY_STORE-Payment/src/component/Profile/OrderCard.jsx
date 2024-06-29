import { Button, Card } from '@mui/material'
import React from 'react'

export const OrderCard=({item,order})=> {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img  className="h-16 w-16"
            src= {item.jewelry.images[0]} alt="" />
        <div>
            <p>{item.jewelry.name}</p>
            <p>{item.totalPrice}</p>
        </div>
        </div>
        <div>
            <Button className='cursor-not-allowed'style={{ color: 'blue' }}>
                {order.orderStatus}
            </Button>
        </div>


    </Card>
  )
}