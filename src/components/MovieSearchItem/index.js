import './index.css'

const MovieSearchItem = props => {
  const {searchData} = props
  const {imageUrl, title, rating} = searchData
  const round4 = Math.round(rating * 10)

  return <li className="searchmovielist">{title}</li>
}

export default MovieSearchItem
