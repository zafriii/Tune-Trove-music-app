import React, { useState, useEffect } from 'react'
import SongData from './SongData.jsx'
import './song.css'
import { FaHeartCirclePlus, FaHeart} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

function Songs() {

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);


const [favoriteSongIds, setFavoriteSongIds] = useState([]);


const [currentSongIndex, setCurrentSongIndex] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);


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



const audioRefs = useRef([]);

const togglePlay = (index) => {
  const audio = audioRefs.current[index];
  const prevAudio = audioRefs.current[currentSongIndex];
  
  if (index === currentSongIndex && isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    if (prevAudio) {
      prevAudio.pause(); 
    }
    audio.play();
    setIsPlaying(true);
    setCurrentSongIndex(index);
  }
};



const updateTime = (index) => {
 
  if (index === currentSongIndex) {
    const audio = audioRefs.current[index];
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  }
};



const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


const downloadSong = (audioSrc, fileName) => {
  const link = document.createElement('a');
  link.href = audioSrc;
  link.download = fileName;
  link.click();
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

                    searchResults.map((curElem , index) => {


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


                                    <button
                                    className="download"
                                    onClick={() => downloadSong(curElem.audio, curElem.name)}
                                  >
                                    <FaDownload />
                                  </button>

                                     

                                    </div>  


                                    <div className="artist-name">

                                        <h3>{curElem.artist}</h3>  

                                    </div>  


                                     <div className="audio" key={curElem.id}>

                                    {/* <audio controls>

                                    <source src={curElem.audio} type="audio/mp3" />

                                    Your browser does not support the audio element.
                                    </audio>  */}


                                  
                                <audio
                                ref={(element) => (audioRefs.current[index] = element)}
                                src={curElem.audio}
                                type="audio/mp3"
                                onTimeUpdate={() => updateTime(index)}
                                onEnded={() => setIsPlaying(false)}
                                ></audio>

                              <div className='player'>
                                <button className='play-pause' onClick={() => togglePlay(index)}>
                                  {currentSongIndex === index && isPlaying ? <FaCirclePause /> : <FaPlayCircle />}
                                </button>
                                <span>{formatTime(currentTime)}</span> /{' '}
                                <span>{formatTime(duration)}</span>
                                
                              </div>

                                                                                                         
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
