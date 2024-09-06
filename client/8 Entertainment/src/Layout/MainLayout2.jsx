import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar2 from '../component/Navbar2';

function MainLayout2() {

    return (
        <div>
            <Navbar2/>
            <Outlet />
        </div>
        );
}

export default MainLayout2