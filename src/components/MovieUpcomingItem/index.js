import {Link} from 'react-router-dom'
import './index.css'

const MovieUpcomingItem = props => {
  const {upcomingData} = props
  const {id, imageUrl, title, rating} = upcomingData

  return (
    <li className="upcomingmovielist">
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt="popular movie"
        className="upcomingImage"
      />
      <div className="upcomingtitleContainer">
        <h1 className="upcomingtitle">{title}</h1>
        <p className="upcomingrating">Rating: {rating}</p>
        <Link to={`/movies/${id}`}>
          <button type="button" className="upcomingviewButton">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieUpcomingItem
