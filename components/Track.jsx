import React from 'react';


function Track(props) {
    const { songInfo } = props;

    

    return (
        <div className="track-card">
            <div className="track-info">
                <div className="track-title">{songInfo.name}</div>
                <div className="track-artist">{songInfo.artist}</div>
                <div className="track-album">{songInfo.album}</div>
            </div>
        </div>
    );
}

export default Track;