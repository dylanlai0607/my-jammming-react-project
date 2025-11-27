import React, { useState } from 'react';
import Track from './Track.jsx'

// const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;
// const params = new URLSearchParams(window.location.search);
// const token = params.get("access_token");
const userId = import.meta.env.SPOTIFY_USER_ID;

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

    async function handleSavePlaylist(event) {
        event.preventDefault();
        

        if(playListName.length > 0 && playlist.length > 0) {
            // Logic to save playlist here.
            // Get list of all spotify playlists
            // Check if name already exists
            // if it does return the id and post tracks to that playlist
            // We want a post call to our spotify api/ account to create a playlist using the name
            // We want to get that id of that playlist then add tracks to that playlist using another post call
            // then clean up the playlist
            async function fetchUserSpotifyPlaylists() {
               try {
                    const response = await fetch('http://127.0.0.1:8888/api/my-playlists');
                    if (!response.ok) throw new Error('Failed to fetch playlists');
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            async function createNewPlaylist(name) {
                try {
                    const response = await fetch('http://127.0.0.1:8888/api/create-playlist', {
                        method: "POST", headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            playlistName: name
                        })
                    });
                    const raw = await response.text();
                    if (!response.ok) {
                        throw new Error(raw);
                    }
                    const data = JSON.parse(raw);
                    return data;   
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            // get list of user playlists
            const usersPlaylists = await fetchUserSpotifyPlaylists();

            if(usersPlaylists.items.filter(item => item.name === playListName).length === 0) {
                // create new playlist
                const newPlaylistInfo = await createNewPlaylist(playListName);
                console.log('New Playlist Info:', newPlaylistInfo);
            }

            // get id of already created playlist and add tracks






        } else {
            alert("Please enter a playlist name and add at least one track before saving!");
        }
        

    }

    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <form>
                <input type="text" placeholder="Enter playlist name" onChange={handlePlaylistNameChange} value={playListName} />
                <button className="save-button" onClick={handleSavePlaylist} >Save to Playlist</button>
            </form>
            
            <ul className="playlist-items">
                {playlist.map((songInfo) => <li key={songInfo.id}><Track songInfo={songInfo} onAction={handleRemoveFromPlaylist} actionLabel={actionLabel}/></li>)}
            </ul>
        </div>
    );
}

export default Playlist;