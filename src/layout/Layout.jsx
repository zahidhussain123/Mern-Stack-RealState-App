import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
    </div>
        <Footer />
    </>
  )
}

export default Layout