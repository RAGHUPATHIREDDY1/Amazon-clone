import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from "../Header"
import SearchBar from "../Search"
import './index.css'

const Home = () => {
  const [moviesList, setMoviesList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  useEffect(() => {
    const getMovies = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      }

      // Originals API
      const originalsApi = "https://apis.ccbp.in/movies-app/originals"
      const originalsResponse = await fetch(originalsApi, options)

      if (originalsResponse.ok === true) {
        const fetchedData = await originalsResponse.json()

        const formattedData = fetchedData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || movie.posterPath || '',
        }))

        setMoviesList(formattedData)
      }

      // Trending Movies API
      const trendingApi = "https://apis.ccbp.in/movies-app/trending-movies"
      const trendingResponse = await fetch(trendingApi, options)

      if (trendingResponse.ok === true) {
        const trendingData = await trendingResponse.json()

        const formattedTrending = trendingData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || '',
        }))

        setTrendingMovies(formattedTrending)
      }

      // Top Rated Movies API
      const topRatedApi = "https://apis.ccbp.in/movies-app/top-rated-movies"
      const topRatedResponse = await fetch(topRatedApi, options)

      if (topRatedResponse.ok === true) {
        const topRatedData = await topRatedResponse.json()

        const formattedTopRated = topRatedData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || '',
        }))

        setTopRatedMovies(formattedTopRated)
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

  const moviesToDisplay = hasSearched ? searchResults : moviesList
  const title = hasSearched ? "Search Results" : "Originals"

  return (
    <div className="home">
      <Header />

      <SearchBar moviesList={moviesList} onSearch={handleSearch} />

      {/* Trending Movies Section */}
      {!hasSearched && (
        <div className="movies-container">
          <h1 className="movies-title">Trending Movies</h1>

          <div className="movies-grid">
            {trendingMovies.map((movie) => (
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
      )}

      {/* Top Rated Movies Section */}
      {!hasSearched && (
        <div className="movies-container">
          <h1 className="movies-title">Top Rated Movies</h1>

          <div className="movies-grid">
            {topRatedMovies.map((movie) => (
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
      )}

      {/* Originals Section */}
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

export default Home