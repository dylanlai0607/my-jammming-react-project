import React from 'react';
import Track from './Track.jsx'


function Tracklist(props) {

    const { data } = props;


    return (
        <div>
            <ul>
                {data.map((songInfo) => <li key={songInfo.id}><Track songInfo={songInfo} /></li>)}
            </ul>
        </div>
    );
}

export default Tracklist;