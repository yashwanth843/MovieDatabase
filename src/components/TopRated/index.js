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
  state = {topRatedData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getTopRatedData()
  }

  getTopRatedData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const topRatedData = await response.json()
      const topRatedUpdatedData = topRatedData.results.map(movie => ({
        id: movie.id,
        imageUrl1: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        topRatedData: topRatedUpdatedData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
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
    return (
      <div className="TopRatedContainer">
        <Header />
        <div className="topRatedMovieContainer">
          {this.renderTopRatedMovieResult()}
        </div>
      </div>
    )
  }
}

export default TopRated
