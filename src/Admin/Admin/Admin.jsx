import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Category } from '../../ManagerComponent/Category/Category'
import Dashboard from '../../ManagerComponent/Dashboard/Dashboard'

import { useDispatch, useSelector } from 'react-redux'
import { Events } from '../../ManagerComponent/Events/Events'
import Ingredients from '../../ManagerComponent/Ingredients/Ingredients'
import Home from '../../ManagerComponent/HomeA/Home'
import { AdminSidebar } from './AdminSideBar'

export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { jewelry } = useSelector(store => store);
    const handleClose = () => { }


    return (
        <div>
            <div className='lg:flex justify-between'>
                <div>
                    <AdminSidebar handleClose={handleClose} />
                </div>
                <div className='lg:w-[80%]'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        {/* <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/category' element={<Category />} />
                        <Route path='/ingredients' element={<Ingredients />} />
                        <Route path='/event' element={<Events />} />
                        <Route path='/details' element={<JewelryDetails />} />
                        <Route path='/add-menu' element={<CreateMenuForm />} />
                        <Route path='/buyback' element={<Buyback/>} />
                        <Route path='/teams' element={<Teams/>} />
                        <Route path='/customer' element={<Customer/>} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    )
}
