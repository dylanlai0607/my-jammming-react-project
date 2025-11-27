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

    async function handleSavePlaylist(event) {
        event.preventDefault();

        if(playListName.length > 0 && playlist.length > 0) {
           
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

            async function addTracksToPlaylist(playlistId, trackUris) {
                try {
                    const response = await fetch('http://127.0.0.1:8888/api/add-tracks', {
                        method: "POST", headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            playlistId: playlistId,
                            trackUris: trackUris
                        })
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            // get list of user playlists
            const usersPlaylists = await fetchUserSpotifyPlaylists();
            console.log("Front end usersPlaylists: ", usersPlaylists)
            let playlistId;
            if(usersPlaylists.items.filter(item => item.name === playListName).length === 0) {
                // create new playlist
                const newPlaylistInfo = await createNewPlaylist(playListName);
                playlistId = newPlaylistInfo.playlistId
            } else {
                //playlist exists
                playlistId = usersPlaylists.items.filter(item => item.name === playListName)[0].id;
            }
            
            // get id of already created playlist and add tracks
            await addTracksToPlaylist(playlistId, playlist.map(track => track.uri));
            
            // Clean up playlist
            setPlaylist([]);
            setPlaylistName("");
            alert(`Playlist "${playListName}" saved successfully!`);


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