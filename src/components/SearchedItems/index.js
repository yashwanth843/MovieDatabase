import {Link} from 'react-router-dom'
import './index.css'

const SearchedItems = props => {
  const {searchData} = props
  const {id, imageUrl, title, rating} = searchData

  return (
    <li className="searchedList">
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt="searched movie"
        className="searchedImage"
      />
      <div className="searchedContainer">
        <h1 className="searchedtitle">{title}</h1>
        <p className="searchedRating">Rating: {rating}</p>
        <Link to={`/movies/${id}`}>
          <button type="button" className="searchedbutton">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default SearchedItems
