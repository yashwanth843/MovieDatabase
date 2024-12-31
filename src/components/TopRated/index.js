import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieTopRatedItem from '../MovieTopRatedItem'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {
    topRatedData: [],
    apiStatus: apiStatusContant.initial,
    page: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getTopRatedData()
  }

  getTopRatedData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const {page} = this.state
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const topRatedData = await response.json()
      const pages = topRatedData.total_pages
      const topRatedUpdatedData = topRatedData.results.map(movie => ({
        id: movie.id,
        imageUrl1: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        topRatedData: topRatedUpdatedData,
        totalPages: pages,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickNextButton = () => {
    const {totalPages, page} = this.state
    if (page !== totalPages) {
      this.setState(
        prevState => ({page: prevState.page + 1}),
        this.getTopRatedData,
      )
    }
  }

  onClickPrevButton = () => {
    const {page} = this.state
    if (page !== 1) {
      this.setState(
        prevState => ({page: prevState.page - 1}),
        this.getTopRatedData,
      )
    }
  }

  renderTopRatedMovie = () => {
    const {topRatedData} = this.state
    return (
      <ul className="topRatedDataUnorderList">
        {topRatedData.map(each => (
          <MovieTopRatedItem topRatedData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderTopRatedLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTopRatedMovieResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderTopRatedMovie()
      case apiStatusContant.inProgress:
        return this.renderTopRatedLoading()
      default:
        return ''
    }
  }

  render() {
    const {page} = this.state
    return (
      <div className="TopRatedContainer">
        <Header />
        <div className="topRatedMovieContainer">
          {this.renderTopRatedMovieResult()}
        </div>
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

export default TopRated
