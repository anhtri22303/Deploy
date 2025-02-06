
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AdminRoute } from './AdminRoute'


const Routers = () => {
    const { auth } = useSelector((store) => store);
    return (
        <Routes>
            <Route path="/" element={<AdminRoute/>} />

        </Routes>
    )
}

export default Routers