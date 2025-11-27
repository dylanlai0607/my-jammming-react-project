import React, { useEffect } from 'react';
import Tracklist from './Tracklist.jsx';


const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;

function SearchResults(props) {
    const [data, setData] = React.useState([]);
    const { searchTerm, setPlaylist } = props;
    const query = encodeURIComponent(searchTerm);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                    method: "GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const res = await response.json();
                const items = res.tracks?.items.map(item => ({name: item.name, artist: item.artists[0].name, album: item.album.name, id: item.id, image: item.album.images[2], uri: item.uri})) || [];

                setData(items);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [searchTerm]);
    
    return (
        <div className="search-results">
            <h2>Results</h2>
            <Tracklist data={data} setPlaylist={setPlaylist} />
        </div>
    );
}

export default SearchResults;