import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const TopRated = () => {
  const [moviesList, setMoviesList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  useEffect(() => {
    const getMovies = async () => {
      const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()

        const formattedData = data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster_path:
            movie.poster_path ||
            movie.posterPath ||
            movie.backdrop_path ||
            movie.backdropPath,
        }))

        setMoviesList(formattedData)
      }
    }

    getMovies()
  }, [jwtToken])

  const handleSearch = results => {
    setSearchResults(results)
    setHasSearched(true)
  }

  const handleMovieClick = id => {
    navigate(`/movie/${id}`)
  }

  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  }

  const moviesToDisplay = hasSearched ? searchResults : moviesList

  return (
    <div className="toprated-page">
      <Header
        moviesList={moviesList}
        onSearch={handleSearch}
      />

      <div className="toprated-banner">
        <div className="banner-content">
          <h1>Top Rated Movies</h1>

          <p>
            Discover the highest rated movies chosen by
            critics and movie lovers around the world.
          </p>
        </div>
      </div>

      <div className="movies-container">
        <h1 className="movies-title">
          {hasSearched ? 'Search Results' : 'Top Rated Collection'}
        </h1>

        {moviesToDisplay.length === 0 && hasSearched ? (
          <p className="no-movies">No Movies Found</p>
        ) : (
          <div className="movies-grid">
            {moviesToDisplay.map(movie => (
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

                <div className="movie-info">
                  <h3 className="movie-name">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopRated