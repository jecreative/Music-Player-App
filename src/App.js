//* React
import { useState, useRef } from 'react'
//* Styles
import './styles/app.scss'
//* Components
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
import Footer from './components/Footer'
//* Data
import data from './data'
//* Helper Function
import { shuffle } from './randomizer'

function App() {
  //* Refs
  const audioRef = useRef(null)

  //* State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [shuffledSongs, setShuffledSongs] = useState(shuffle(data()))

  //* Event handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    // Calculate Percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }

  return (
    <>
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          setCurrentSong={setCurrentSong}
          shuffledSongs={shuffledSongs}
          setShuffledSongs={setShuffledSongs}
          data={data}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
        <Song currentSong={currentSong} songInfo={songInfo} />
        <Player
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          setSongs={setSongs}
          songs={songs}
        />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
        ></audio>
        <Footer />
      </div>
    </>
  )
}

export default App
