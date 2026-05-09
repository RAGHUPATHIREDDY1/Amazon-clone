import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from "../header"
import SearchBar from "../search"
import './index.css'

const Popular = () => {
  const [popularMoviesList, setPopularMoviesList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  useEffect(() => {
    const getMovies = async () => {
      const apiUrl = "https://apis.ccbp.in/movies-app/popular-movies"
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const formattedData = fetchedData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || movie.posterPath || '',
        }))
        setPopularMoviesList(formattedData)
      }
    }

    getMovies()
  }, [jwtToken])

  const handleSearch = (results) => {
    setSearchResults(results)
    setHasSearched(results.length > 0 || results.length === 0)
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  }

  const moviesToDisplay = hasSearched ? searchResults : popularMoviesList
  const title = hasSearched ? "Search Results" : "Popular Movies"

  return (
    <div className="popular">
      <Header />
      <SearchBar moviesList={popularMoviesList} onSearch={handleSearch} />

      <div className="movies-container">
        <h1 className="movies-title">{title}</h1>
        {moviesToDisplay.length === 0 && hasSearched && (
          <p className="no-movies">No movies found</p>
        )}

        <div className="movies-grid">
          {moviesToDisplay.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="movie-poster"
              />
              <h3 className="movie-name">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Popular;