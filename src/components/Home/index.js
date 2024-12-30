import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoviePopularItem from '../MoviePopularItem'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {popularData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)
    if (response.ok) {
      const popularData = await response.json()
      const popularUpdatedData = popularData.results.map(movie => ({
        id: movie.id,
        imageUrl: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        popularData: popularUpdatedData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  popularSingleId = id => {
    console.log(id)
  }

  renderPopularMovie = () => {
    const {popularData} = this.state
    return (
      <ul className="popularDataUnorderList">
        {popularData.map(each => (
          <MoviePopularItem
            popularData={each}
            key={each.id}
            popularSingleId={this.popularSingleId}
          />
        ))}
      </ul>
    )
  }

  renderPopularLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPopularMovieResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderPopularMovie()
      case apiStatusContant.inProgress:
        return this.renderPopularLoading()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="HomeContainer">
        <Header />
        <div className="homeMovieContainer">
          {this.renderPopularMovieResult()}
        </div>
      </div>
    )
  }
}

export default Home
