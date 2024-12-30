import {Link} from 'react-router-dom'
import './index.css'

const MovieTopRatedItem = props => {
  const {topRatedData} = props
  const {id, imageUrl1, title, rating} = topRatedData
  const round1 = Math.round(rating * 10)
  return (
    <li className="topmovielist">
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageUrl1}`}
        alt="topRated movie"
        className="topImage"
      />
      <div className="toptitleContainer">
        <h1 className="toptitle">{title}</h1>
        <p className="toprating">Rating: {round1}%</p>
        <Link to={`/movies/${id}`}>
          <button type="button" className="topviewButton">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieTopRatedItem