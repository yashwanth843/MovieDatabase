import './index.css'

const MovieCastItem = props => {
  const {casteDetails} = props
  const {character, originalName, profileImage} = casteDetails

  return (
    <li className="casteListContainer">
      <img
        src={`https://image.tmdb.org/t/p/w500/${profileImage}`}
        alt="movie cast"
        className="castImage"
      />
      <h1 className="originalName">{originalName}</h1>
      <h1 className="originalName">{character}</h1>
    </li>
  )
}

export default MovieCastItem
