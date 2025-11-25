import React, { useEffect } from 'react';
import Tracklist from './Tracklist.jsx';

const token = 'BQDKH75K5gJnfmvxzY9V_GqZE5v2C-icMJ4MXUtfLu68CuvMS-wb6cyWjnb_E_FBwgpqfV9_TNegTXifNRpwZzsYKXkD3LRr1ui_hciwnSbsGFond3kbxFfuPIaYPvLZY6TyXr7xtt8'

function SearchResults(props) {
    const [data, setData] = React.useState([]);
    const { searchTerm } = props;

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
                console.log(res);
                const items = res.tracks?.items.map(item => ({name: item.name, artist: item.artists[0].name, album: item.album.name, id: item.id})) || [];

                setData(items);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [searchTerm]);
    
    

    return (
        <div>
            <h2>Results</h2>
            <Tracklist data={data} />
        </div>
    );
}

export default SearchResults;