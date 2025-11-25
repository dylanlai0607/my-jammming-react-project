import React, { useState } from 'react';


function SearchBar(props) {
    const { searchTerm, setSearchTerm } = props;

    const handleUserInput = (event) => {
        setSearchTerm(event.target.value);
    }
    const handleSearchTerm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        // console.log("Searching...");
    }

    return (
        <div>
            <form onChange={handleSearchTerm}>
                <input placeholder="Enter A Song, Album, or Artist" onChange={handleUserInput} value={searchTerm} />
                <button type="submit">SEARCH</button>
            </form>
        </div>
    );
}

export default SearchBar;