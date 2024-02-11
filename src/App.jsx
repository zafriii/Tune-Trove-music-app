import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from './Navigation'
import Home from './Pages/Home'
import SongPage from './Pages/SongPage'
import Footer from './components/Footer'



function App() {
 
  return (
    <>
    
          <BrowserRouter>

          <Navigation/>

                <Routes>                

                    <Route path='/' element={<Home/>}/>
                    <Route path='/songs' element={<SongPage/>}/>
                    
                   
                </Routes>    

          <Footer/>                 

          </BrowserRouter>


    </>
  )
}

export default App
