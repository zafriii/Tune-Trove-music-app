import React from 'react'
import { NavLink } from "react-router-dom";

function HeroSection() {


  return (
    <>
    <div className="container">

     <div className="image">
        
     <img src='images/hero_image2.png'></img>
    
     
    </div> 

    <div className="text">

        <h3>Tune Trove</h3>
        
        <p>Embark on a Harmonious Journey : Where Music Comes to Life !</p> 
        
    </div>  

    </div>


    <div className="container-2">

                <h3>Music</h3>

                <h3>Stream songs,  ad-free</h3>

                <p>All the music in your personal TuneTrove library — no matter where it came from — lives right alongside the Trove Music catalog.</p>


                <NavLink to="/songs" className="navbar-link">
                    
                <button className='start'>Start Listening</button>

                </NavLink>
               
    </div>
    

    </>
  )
}

export default HeroSection