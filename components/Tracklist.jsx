import React from 'react';
import Track from './Track.jsx'


function Tracklist(props) {
    const { data, setPlaylist } = props;

    function handleAddToPlaylist(songInfo) {

        setPlaylist(prev => [...prev, songInfo])
        
    }


    return (
        <div>
            <ul>
                {data.map((songInfo) => 
                    <li key={songInfo.id}>
                        <Track songInfo={songInfo} />
                        <button className="track-add" onClick={() => handleAddToPlaylist(songInfo)}>Add to Playlist</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Tracklist;