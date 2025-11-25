import React, { useState } from 'react';


function SearchBar(props) {
    const { searchTerm, setSearchTerm } = props;

    const handleUserInput = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="searchbar">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="search-input"
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={handleUserInput}
                    value={searchTerm}
                />
                <button className="search-button" type="submit">SEARCH</button>
            </form>
        </div>
    );
}

export default SearchBar;