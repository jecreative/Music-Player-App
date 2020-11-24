import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faRandom } from '@fortawesome/free-solid-svg-icons'
import data from '../data'
//* Helper Function
import { shuffle } from '../randomizer'

const Nav = ({
  setLibraryStatus,
  libraryStatus,
  setCurrentSong,
  shuffledSongs,
  setShuffledSongs,
  data,
  setIsPlaying,
  isPlaying,
  audioRef,
}) => {
  const handleShuffleSongs = async () => {
    await setShuffledSongs(shuffle(data()))
    setCurrentSong(shuffledSongs[0])
    audioRef.current.play()
    setIsPlaying(true)
  }
  return (
    <nav>
      <div className='shuffle'>
        <button onClick={handleShuffleSongs}>
          Shuffle <FontAwesomeIcon icon={faRandom} />
        </button>
      </div>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}

export default Nav
