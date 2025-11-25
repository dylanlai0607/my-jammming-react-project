import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import Playlist from '../components/Playlist';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [playlist, setPlaylist] = useState([]);

  return (
    <>
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
