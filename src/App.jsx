import { useState } from 'react';
import './App.css';
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import Playlist from '../components/Playlist';
import SpotifyLogin from '../components/SpotifyLogin.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [playlist, setPlaylist] = useState([]);

  return (
    <>
      <SpotifyLogin />
      <div className="searchbar-container">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>
      <div className="main-columns">
        <div className="column left">
          <SearchResults searchTerm={searchTerm} setPlaylist={setPlaylist}/>
        </div>
        <div className="column right">
          <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
        </div>
      </div>

    </>
  )
}

export default App
