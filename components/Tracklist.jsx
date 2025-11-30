import React from 'react';
import Track from './Track.jsx';

function Tracklist(props) {
    const { data, setPlaylist } = props;
    const actionLabel = "Add to Playlist";

    function handleAddToPlaylist(songInfo) {
        setPlaylist(prev => [...prev, songInfo]);
    }

    return (
        <div>
            <ul>
                {data.map((songInfo) =>
                    <li key={songInfo.id}>
                        <Track songInfo={songInfo} onAction={handleAddToPlaylist} actionLabel={actionLabel} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Tracklist;