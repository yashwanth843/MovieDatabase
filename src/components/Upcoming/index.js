import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieUpcomingItem from '../MovieUpcomingItem'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Upcoming extends Component {
  state = {
    upcomingData: [],
    apiStatus: apiStatusContant.initial,
    page: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getUpcomingData()
  }

  getUpcomingData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const {page} = this.state
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const upcomingData = await response.json()
      const pages = upcomingData.total_pages
      const upcomingUpdatedData = upcomingData.results.map(movie => ({
        id: movie.id,
        imageUrl: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        upcomingData: upcomingUpdatedData,
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
        this.getUpcomingData,
      )
    }
  }

  onClickPrevButton = () => {
    const {page} = this.state
    if (page !== 1) {
      this.setState(
        prevState => ({page: prevState.page - 1}),
        this.getUpcomingData,
      )
    }
  }

  renderUpcomingMovie = () => {
    const {upcomingData} = this.state
    return (
      <ul className="upcomingDataUnorderList">
        {upcomingData.map(each => (
          <MovieUpcomingItem upcomingData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderUpcomingLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderUpcomingMovieResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderUpcomingMovie()
      case apiStatusContant.inProgress:
        return this.renderUpcomingLoading()
      default:
        return ''
    }
  }

  render() {
    const {page} = this.state
    return (
      <div className="upcomingContainer">
        <Header />
        <div className="upcomingMovieContainer">
          {this.renderUpcomingMovieResult()}
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

export default Upcoming
