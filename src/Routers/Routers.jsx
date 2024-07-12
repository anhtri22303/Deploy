
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CustomerRoute} from './CustomerRoute'
import {ManagerRoute} from './ManagerRoute'
import LoginForm from '../component/Auth/LoginForm'
import { useSelector } from 'react-redux'
import Home from '../component/Home/Home'



const Routers = () => {
    const { auth } = useSelector((store) => store);
    return (
        <Routes>
            <Route path="/*" element={ auth.user ? <CustomerRoute /> :<LoginForm/>} />
            <Route path="/admin/jewelry/*" element={<ManagerRoute />} />
        </Routes>
    )
}

export default Routers