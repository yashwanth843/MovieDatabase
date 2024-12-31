import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieCaste from '../MovieCaste'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleMovie extends Component {
  state = {singleMovieData: {}, apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getSingleMovieData()
  }

  getSingleMovieData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const singleUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(singleUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const singleMovieUpdated = {
        id: data.id,
        title: data.title,
        rating: data.vote_average,
        duration: data.runtime,
        genres: data.genres,
        releaseDate: data.release_date,
        overView: data.overview,
        imageUrl: data.poster_path,
        tagline: data.tagline,
      }
      this.setState({
        singleMovieData: singleMovieUpdated,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  changeToOrginalTime = duration => {
    const hours = Math.floor(duration / 60)
    const mins = duration % 60
    return `${hours}h ${mins}m`
  }

  changeToNormalDate = date => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  renderSingleMovieSuccess = () => {
    const {singleMovieData} = this.state
    console.log(singleMovieData)
    const {
      title,
      rating,
      duration,
      genres,
      releaseDate,
      overView,
      imageUrl,
      tagline,
    } = singleMovieData
    const originalTime = this.changeToOrginalTime(duration)
    const changeDate = this.changeToNormalDate(releaseDate)
    const [year] = releaseDate.split('-')

    return (
      <>
        <div className="singleMovieContainer">
          <img
            src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
            alt="movie details"
            className="singleMovieImage"
          />
          <div className="singleTextDetailsContainer">
            <h1 className="movieName">
              {title} ({year})
            </h1>
            <div className="dateContainer">
              <p className="releaseDate">{changeDate}•</p>
              <ul className="genresContainer">
                {genres.map(each => (
                  <li className="genresName">{each.name},</li>
                ))}
              </ul>
              <p className="duration">• {originalTime}</p>
            </div>
            <div className="ratingContainer">
              <p className="rating">Rating: {rating}</p>
            </div>
            <p className="tagline">{tagline}</p>
            <h1 className="overViewhead">OverView</h1>
            <p className="overView">{overView}</p>
          </div>
        </div>
        <MovieCaste />
      </>
    )
  }

  renderSingleMovieLoading = () => (
    <div className="loadingContainer">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSingleMovieResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSingleMovieSuccess()
      case apiStatusContant.inProgress:
        return this.renderSingleMovieLoading()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="SingleMoviesContainer">
        <Header />
        {this.renderSingleMovieResult()}
      </div>
    )
  }
}

export default SingleMovie
