import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import OrdersTable from './OrdersTable';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" }
];

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
          Order Status
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrdersTable filter={filterValue} />
    </div>
  );
};
