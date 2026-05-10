import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const MovieItemdetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const jwtToken = Cookies.get('jwt_token')
  
  useEffect(() => {
    const getMovieDetails = async () => {
      const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const movieData = {
        ...data.movie_details,
        poster_path: data.movie_details.poster_path ? `https://image.tmdb.org/t/p/w500${data.movie_details.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image',
      }
      setMovie(movieData)
      console.log('Movie details:', movieData)
    }
    
    getMovieDetails()
  }, [id, jwtToken])
  
  if (!movie) {
    return <div><Header /><p>Loading...</p></div>
  }
  
  return (
    <div className="movie-details">
      <Header />
      
      <div className="movie-detail-container">
        <img 
          src={movie.poster_path}
          alt={movie.title}
          className="detail-poster"
        />
        
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p><strong>Duration:</strong> {movie.runtime} min</p>
          
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          
          {movie.genres && movie.genres.length > 0 && (
            <div>
              <h3>Genres</h3>
              <div className="genres-list">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre">{genre.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieItemdetails;