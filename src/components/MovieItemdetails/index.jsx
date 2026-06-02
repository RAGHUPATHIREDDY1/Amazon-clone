import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const MovieItemdetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)

  const jwtToken = Cookies.get('jwt_token')

  useEffect(() => {
    const getMovieDetails = async () => {
      const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      const movieData = {
        ...data.movie_details,
        poster_path:
          data.movie_details.poster_path ||
          'https://via.placeholder.com/300x450',
      }

      setMovie(movieData)
    }

    getMovieDetails()
  }, [id, jwtToken])

  if (!movie) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <h1>Loading Movie...</h1>
        </div>
      </>
    )
  }

  return (
    <div className="movie-details-page">
      <Header />

      <div className="movie-banner">
        <div className="movie-overlay">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="movie-detail-container">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="detail-poster"
            />

            <div className="movie-detail-info">
              <h1 className="movie-title">
                {movie.title}
              </h1>

              <div className="rating-badge">
                ⭐ {movie.vote_average}/10
              </div>

              <p>
                <strong>Release Date:</strong>{' '}
                {movie.release_date}
              </p>

              <p>
                <strong>Duration:</strong>{' '}
                {movie.runtime} min
              </p>

              <h3>Overview</h3>

              <p className="overview">
                {movie.overview}
              </p>

              {movie.genres && (
                <>
                  <h3>Genres</h3>

                  <div className="genres-list">
                    {movie.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="genre"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieItemdetails