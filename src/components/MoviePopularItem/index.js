import {Link} from 'react-router-dom'
import './index.css'

const MoviePopularItem = props => {
  const {popularData} = props
  const {id, imageUrl, title, rating} = popularData
  const round = Math.round(rating * 10)

  return (
    <li className="popularmovielist">
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
        alt="popular movie"
        className="popularImage"
      />
      <div className="titleContainer">
        <h1 className="title">{title}</h1>
        <p className="rating">Rating: {round}%</p>
        <Link to={`/movies/${id}`}>
          <button type="button" className="viewButton">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MoviePopularItem
