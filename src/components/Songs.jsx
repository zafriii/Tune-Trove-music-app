import React, { useState, useEffect } from 'react'
import SongData from './SongData.jsx'
import './song.css'
import { FaHeartCirclePlus, FaHeart} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

function Songs() {

// const [items, setItems] = useState(SongData);

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);


const [favoriteSongIds, setFavoriteSongIds] = useState([]);



// const filterItem = (typeItem) => {
//   const updatedItem = SongData.filter((curElem) => {
//     return curElem.type === typeItem
//   })

//   setItems(updatedItem);
// }



const filterItem = (typeItem) => {
  const updatedItem = SongData.filter((curElem) => {
    return curElem.type === typeItem
  })

  setSearchResults(updatedItem);
  
}


const handleChange = (event) => {
  setSearchTerm(event.target.value);
};

useEffect(() => {
  const results = SongData.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setSearchResults(results);
}, [searchTerm]);


const toggleFavorite = (id) => {
  if (favoriteSongIds.includes(id)) {
      setFavoriteSongIds(favoriteSongIds.filter(songId => songId !== id));
  } else {
      setFavoriteSongIds([...favoriteSongIds, id]);
  }
};

const isFavorite = (id) => {
  return favoriteSongIds.includes(id);
};


  return (
    <>


          <div className="btn-container">


           <div className="btns"> 

          <button onClick={() => setSearchResults(SongData)}>All</button>
          <button onClick={() => filterItem ("hindi")}>Hindi</button>
          <button onClick={() => filterItem ("english")}>English</button>
          <button onClick={() => filterItem ("bangla")}>Bangla</button> 

          </div>


          <div className="search">

            <input type='text'
             placeholder='Search songs...'
             value={searchTerm}
             onChange={handleChange} />
                
            </div>


          </div> 


          <div className="heading"><h1>Playlist</h1><FaHeadphones className='playlist'/></div>
   
    
    <div className="song-container">

                

        {             

                    searchResults.map((curElem) => {


                        return (


                            <div className="card-container" key={curElem.id}>


                                    <div className="image-container">

                                         <img src={curElem.image}></img>

                                    </div>

                                    <div className="song">
                                        
                                        
                                    <div className="song-name">

                                        <h3>{curElem.name}</h3>  


                                                                                                                   

                                    <button
                                        className='like'
                                        onClick={() => toggleFavorite(curElem.id)}>
                                    
                                        {isFavorite(curElem.id) ? <FaHeart /> : <FaHeartCirclePlus />}
                                    </button>

                                     

                                    </div>  


                                    <div className="artist-name">

                                        <h3>{curElem.artist}</h3>  

                                    </div>  


                                     <div className="audio">

                                    <audio controls>

                                    <source src={curElem.audio} type="audio/mp3" />

                                    Your browser does not support the audio element.
                                    </audio> 

                                   
                                    
                                      </div>



                                    </div>        
                                        
                                    </div>    

                                   
                            

                        )

                })
              
              

        }


    </div>
    
    
    
    
    
    
    
    </>
  )
}

export default Songs