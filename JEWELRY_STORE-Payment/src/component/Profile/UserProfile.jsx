import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button } from '@mui/material';
const UserProfile = () => {
const handleLogout=()=>{

  
}

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
      <AccountBoxIcon sx={{fontSize:"9rem"}}/>
<h1 className='py-5 text-2x1 font-semibold'>Càng tự do hơn, anh càng cô đơn</h1>
    <p>Think231003@gmail.com</p> 
    <Button onClick={handleLogout} sx={{
            margin: "2rem 0rem",
            backgroundColor: "#2196f3", // Custom blue color
            "&:hover": {
              backgroundColor: "#1976d2", // Custom blue hover color
            },
          }}>
    Logout
    </Button>     
  </div>
    </div>
  )
}

export default UserProfile
