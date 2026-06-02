import { useState } from 'react'
import './index.css'

const SearchBar = ({ moviesList = [], onSearch }) => {
  const [searchInput, setSearchInput] = useState('')
  
  const handleSearch = (e) => {
    const searchText = e.target.value
    setSearchInput(searchText)
    
    if (searchText.trim() === '') {
      if (onSearch) {
        onSearch([])
      }
      return
    }
    

    const searchLower = searchText.toLowerCase()
    
    const filteredMovies = moviesList.filter((movie) =>
      movie.title.toLowerCase().includes(searchLower)
    )
    
    console.log('Search Results:', filteredMovies)
    if (onSearch) {
      onSearch(filteredMovies)
    }
  }
  
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies..."
          value={searchInput}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
    </div>
  );
}
export default SearchBar;