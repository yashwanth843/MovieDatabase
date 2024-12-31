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
  state = {
    searchedMovieData: [],
    apiStatus: apiStatusContant.initial,
    page: 1,
    totalPages: 0,
  }

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
    const {page} = this.state
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {query} = params
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const searchData = await response.json()
      const pages = searchData.total_pages
      console.log(searchData)
      const searchUpdated = searchData.results.map(each => ({
        id: each.id,
        imageUrl: each.poster_path,
        title: each.title,
        rating: each.vote_average,
      }))
      this.setState({
        searchedMovieData: searchUpdated,
        totalPages: pages,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickTryButton = () => {
    this.getSearchMovieData()
  }

  onClickNextButton = () => {
    const {totalPages, page} = this.state
    if (page !== totalPages) {
      this.setState(
        prevState => ({page: prevState.page + 1}),
        this.getSearchMovieData,
      )
    }
  }

  onClickPrevButton = () => {
    const {page} = this.state
    if (page !== 1) {
      this.setState(
        prevState => ({page: prevState.page - 1}),
        this.getSearchMovieData,
      )
    }
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
    const {page} = this.state
    return (
      <div className="searchMovieContainer">
        <Header />
        <div className="searchDataContainer">{this.renderSearchResult()}</div>
        <div className="pageContainer">
          <button
            type="button"
            className="prevButton"
            onClick={this.onClickPrevButton}
          >
            Prev
          </button>
          <p className="pageCount">{page}</p>
          <button
            type="button"
            className="prevButton"
            onClick={this.onClickNextButton}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default MovieSearchItem
