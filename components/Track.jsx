import React from 'react';


function Track(props) {
    const { songInfo } = props;

    return (
        <div>
            <h1>{songInfo.name}</h1>
            <h2>{songInfo.artist}</h2>
            <h2>{songInfo.album}</h2>

            <button>Add to Playlist</button>
        </div>
    );
}

export default Track;