import React from 'react';


function Track(props) {
    const { songInfo, onAction, actionLabel } = props;

    

    return (
        <div className="track-card">
            <div className="track-info">
                <div className="track-image">
                    <img src={songInfo.image.url} alt={`${songInfo.name} album cover`} />
                </div>
                <div className="track-title">{songInfo.name}</div>
                <div className="track-artist">{songInfo.artist}</div>
                <div className="track-album">{songInfo.album}</div>
                <button className="track-add" onClick={() => onAction(songInfo)}>{actionLabel}</button>
            </div>
        </div>
    );
}

export default Track;