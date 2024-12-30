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
  state = {upcomingData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getUpcomingData()
  }

  getUpcomingData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const upcomingData = await response.json()
      const upcomingUpdatedData = upcomingData.results.map(movie => ({
        id: movie.id,
        imageUrl: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        upcomingData: upcomingUpdatedData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
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
    return (
      <div className="upcomingContainer">
        <Header />
        <div className="upcomingMovieContainer">
          {this.renderUpcomingMovieResult()}
        </div>
      </div>
    )
  }
}

export default Upcoming
