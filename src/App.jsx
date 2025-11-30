import { useEffect, useState } from 'react';
import './App.css';
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import Playlist from '../components/Playlist';
import SpotifyLogin from '../components/SpotifyLogin.jsx';
import UserProfile from '../components/UserProfile.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [authenticated, setAuthentication] = useState(false);
  const loginOrProfile = authenticated ? <UserProfile /> : <SpotifyLogin />;

  useEffect(() => {
    fetch("http://localhost:8888/auth-status")
      .then(res => res.json())
      .then(data => setAuthentication(data.authenticated));
  }, []);

  return (
    <>
      {loginOrProfile}
      <div className="searchbar-container">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>
      <div className="main-columns">
        <div className="column left">
          <SearchResults searchTerm={searchTerm} setPlaylist={setPlaylist} />
        </div>
        <div className="column right">
          <Playlist playlist={playlist} setPlaylist={setPlaylist} />
        </div>
      </div>
    </>
  );
}

export default App;