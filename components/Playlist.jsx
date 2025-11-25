import React, { useState } from 'react';
import Track from './Track.jsx'


function Playlist(props) {
    const { playlist, setPlaylist } = props;
    const [playListName, setPlaylistName] = useState("");
    const actionLabel = "-"
    
    function handleRemoveFromPlaylist(songInfo) {
        setPlaylist(prev => prev.filter(track => track.id !== songInfo.id));
    }

    function handlePlaylistNameChange(event) {
        setPlaylistName(event.target.value);
    }
    
    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <form>
                <input type="text" placeholder="Enter playlist name" onChange={handlePlaylistNameChange} value={playListName} />
                <button className="save-button">Save to Playlist</button>
            </form>
            
            
            <ul className="playlist-items">
                {playlist.map((songInfo) => <li key={songInfo.id}><Track songInfo={songInfo} onAction={handleRemoveFromPlaylist} actionLabel={actionLabel}/></li>)}
            </ul>
        </div>
    );
}

export default Playlist;