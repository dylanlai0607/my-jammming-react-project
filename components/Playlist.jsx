import React from 'react';
import Track from './Track.jsx'


function Playlist(props) {
    const { playlist } = props;
    
    

    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <form>
                <input type="text" placeholder="Enter playlist name"/>
            </form>
            <button className="save-button">Save to Playlist</button>
            
            <ul className="playlist-items">
                {playlist.map((songInfo) => <li key={songInfo.id}><Track songInfo={songInfo} /></li>)}
            </ul>
        </div>
    );
}

export default Playlist;