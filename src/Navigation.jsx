import React from 'react'
import { NavLink } from "react-router-dom";


function Navigation () {
  return (

    <>
    
    <div className="navbar">


            <div className="nav-logo">
                <h2>Tune<span>Trove</span></h2>

            </div>

            <div className="nav-links">

                

                <NavLink to="/" className="navbar-link">Home</NavLink>

                <NavLink to="/songs" className="navbar-link">Songs</NavLink>

                

                
             </div>

    </div>

    
    </>
  )
}

export default Navigation