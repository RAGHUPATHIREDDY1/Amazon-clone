import {useState} from 'react'
import './index.css'

const SearchBar = ({moviesList = [], onSearch}) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = event => {
    const searchText = event.target.value

    setSearchInput(searchText)

    const filteredMovies = moviesList.filter(movie =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    )

    if (onSearch) {
      onSearch(filteredMovies, searchText)
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
  )
}

export default SearchBar