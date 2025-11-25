import React, { useEffect } from 'react';

const token = 'BQDyHFyEskOWxCXUpPy8dIj8BcRDwMb23j9B6a_qTwD4x8fdgdNzJkpxOw8ueue8G0CTGaVhrQ_07-mOaUP4ak07rzFVMCsBX4j71gmzk-fAgiPyyITZ-HSGUb1CfMdAkTeDvh0_Uck'

function SearchResults(props) {
    const [data, setData] = React.useState("");
    const { searchTerm } = props;




    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.spotify.com/v1/search?q=justin%20bieber&type=track', {
                    method: "GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const res = await response.json();
                
                // console.log(res);
                setData(res);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);
    
    

    return (
        <div>
            <h2>Results</h2>
            {/* <h1>{JSON.stringify(data)}</h1> */}
            <h1>{searchTerm}</h1>
        </div>
    );
}

export default SearchResults;