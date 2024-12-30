import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import MovieCastItem from '../MovieCastItem'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieCaste extends Component {
  state = {
    singleMovieCasteData: [],
    apiStatus: apiStatusContant.initial,
  }

  componentDidMount() {
    this.getMovieCasteData()
  }

  getMovieCasteData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieCasteUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(movieCasteUrl, options)

    if (response.ok) {
      const singMovieCastData = await response.json()
      console.log(singMovieCastData)
      const casteUpdated = singMovieCastData.cast.map(casted => ({
        id: casted.id,
        character: casted.character,
        originalName: casted.original_name,
        profileImage: casted.profile_path,
      }))
      this.setState({
        singleMovieCasteData: casteUpdated,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  renderSingleMovieCastSuccess = () => {
    const {singleMovieCasteData} = this.state

    return (
      <ul className="casteItemContainer">
        {singleMovieCasteData.map(each => (
          <MovieCastItem casteDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSingleMovieCastLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSingleMovieCastResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSingleMovieCastSuccess()
      case apiStatusContant.inProgress:
        return this.renderSingleMovieCastLoading()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="sample">
        <h1 className="casteHead">Cast</h1>
        {this.renderSingleMovieCastResult()}
      </div>
    )
  }
}

export default withRouter(MovieCaste)
