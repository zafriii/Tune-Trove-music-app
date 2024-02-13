import React, { useState, useEffect, useRef } from 'react'
import SongData from './SongData.jsx'
import './song.css'
import { FaHeartCirclePlus, FaHeart} from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause , FaDownload } from "react-icons/fa6";

function Songs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [favoriteSongIds, setFavoriteSongIds] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([]);
  const [duration, setDuration] = useState(0);

  const filterItem = (typeItem) => {
    const updatedItem = SongData.filter((curElem) => {
      return curElem.type === typeItem;
    });

    let currTime = [...currentTime];
    currTime.push(0);
    setCurrentTime(currTime);

    setSearchResults(updatedItem);
  };

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
      setFavoriteSongIds(favoriteSongIds.filter((songId) => songId !== id));
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

      const updatedTime = [...currentTime];
      updatedTime[index] = audio.currentTime;
      setCurrentTime(updatedTime);
      setDuration(audio.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const downloadSong = (audioSrc, fileName) => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = fileName;
    link.click();
  };

  const favoriteSongs = searchResults.filter((song) =>
    favoriteSongIds.includes(song.id)
  );

  return (
    <>
      <div className="btn-container">
        <div className="btns">
          <button onClick={() => setSearchResults(SongData)}>All</button>
          <button onClick={() => filterItem("hindi")}>Hindi</button>
          <button onClick={() => filterItem("english")}>English</button>
          <button onClick={() => filterItem("bangla")}>Bangla</button>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="heading">
        <h1>Playlist</h1>
        <FaHeadphones className="playlist" />
      </div>

      <div className="song-container">
        {searchResults.map((curElem, index) => {
          return (
            <div className="card-container" key={curElem.id}>
              <div className="image-container">
                <img src={curElem.image}></img>
              </div>





              <div className="song">
                <div className="song-name">
                  <h3>{curElem.name}</h3>
              </div>

              <div className="like-down">
                  <button
                    className="like"
                    onClick={() => toggleFavorite(curElem.id)}
                  >
                    {isFavorite(curElem.id) ? (
                      <FaHeart />
                    ) : (
                      <FaHeartCirclePlus />
                    )}
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
                  <audio
                    ref={(element) => (audioRefs.current[index] = element)}
                    src={curElem.audio}
                    type="audio/mp3"
                    onTimeUpdate={() => updateTime(index)}
                    onEnded={() => setIsPlaying(false)}
                  ></audio>

                  
                  <div className="song-range">
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime[index] || 0}
                      onChange={(e) => {
                        const time = parseFloat(e.target.value);
                        setCurrentTime((prevTime) => {
                          const updatedTime = [...prevTime];
                          updatedTime[index] = time;
                          return updatedTime;
                        });
                        audioRefs.current[currentSongIndex].currentTime = time;
                      }}
                    />
                  </div>

                  <div className="player">
                    <button
                      className="play-pause"
                      onClick={() => togglePlay(index)}
                    >
                      {currentSongIndex === index && isPlaying ? (
                        <FaCirclePause />
                      ) : (
                        <FaPlayCircle />
                      )}
                    </button>
                    <span>{formatTime(currentTime[index] ?? 0)}</span> /{" "}
                    <span>{curElem.song_duration}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </div>

      <div className="fav-container">
        <h3>Keep Track of Your Favorites Here :</h3>

        {favoriteSongs.map((curElem, index) => {
          const serialNumber = index + 1;

          return (
            <div className="fav-card-container" key={curElem.id}>
              {/* Render favorite song card */}

              <div className="fav-image-container">
                <img src={curElem.image}></img>
              </div>

              <div className="fav-song-name">
                <p>
                  {serialNumber}. {curElem.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Songs;
