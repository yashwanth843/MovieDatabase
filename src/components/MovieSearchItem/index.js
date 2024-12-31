import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SearchedItems from '../SearchedItems'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieSearchItem extends Component {
  state = {searchedMovieData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getSearchMovieData()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const {query} = params

    const prevQuery = prevProps.match.params.query
    if (query !== prevQuery) {
      this.getSearchMovieData()
    }
  }

  getSearchMovieData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {query} = params
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const searchData = await response.json()
      console.log(searchData)
      const searchUpdated = searchData.results.map(each => ({
        id: each.id,
        imageUrl: each.poster_path,
        title: each.title,
        rating: each.vote_average,
      }))
      this.setState({
        searchedMovieData: searchUpdated,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickTryButton = () => {
    this.getSearchMovieData()
  }

  renderSearchSuccess = () => {
    const {searchedMovieData} = this.state
    return (
      <ul className="searchedUnorder">
        {searchedMovieData.map(each => (
          <SearchedItems searchData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSearchLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSearchFailure = () => (
    <div className="failureContainer">
      <h1 className="failureText">Movie not found</h1>
      <button
        type="button"
        className="tryagainbutton"
        onClick={this.onClickTryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSearchSuccess()
      case apiStatusContant.failure:
        return this.renderSearchFailure()
      case apiStatusContant.inProgress:
        return this.renderSearchLoading()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="searchMovieContainer">
        <Header />
        <div className="searchDataContainer">{this.renderSearchResult()}</div>
      </div>
    )
  }
}

export default MovieSearchItem
