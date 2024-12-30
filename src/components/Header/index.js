import {Component} from 'react'
import {Link} from 'react-router-dom'
import MovieSearchItem from '../MovieSearchItem'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Header extends Component {
  state = {searchData: [], apiStatus: apiStatusContant.initial, searchInput: ''}

  componentDidMount() {
    this.getSearchData()
  }

  getSearchData = async () => {
    const {searchInput} = this.state

    this.setState({apiStatus: apiStatusContant.inProgress})
    const apiKey = 'dd72515ce3284d70cef8f7b1c4369371'
    const uri = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(uri, options)

    if (response.ok) {
      const searchedData = await response.json()
      const searchUpdated = searchedData.results.map(movie => ({
        id: movie.id,
        imageUrl: movie.poster_path,
        title: movie.title,
        rating: movie.vote_average,
      }))
      this.setState({
        searchData: searchUpdated,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  renderSearchedMovie = () => {
    const {searchData} = this.state
    console.log(searchData)
    return (
      <ul className="searchDataUnorderList">
        {searchData.map(each => (
          <MovieSearchItem searchData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSearchLoading = () => (
    <div className="searchLoading">
      <p>Loading...</p>
    </div>
  )

  renderSearchMovieResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSearchedMovie()
      case apiStatusContant.inProgress:
        return this.renderSearchLoading()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getSearchData()
  }

  render() {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <>
        <nav className="headerContainer">
          <Link to="/" className="navbarLink">
            <h1 className="logoName">movieDB</h1>
          </Link>
          <div className="inputContainer">
            <input
              type="search"
              placeholder="Search Movies"
              className="inputBar"
              onChange={this.onChangeSearch}
            />

            <button
              type="button"
              className="searchButton"
              onClick={this.onClickSearchButton}
            >
              Search
            </button>
          </div>
          <div className="navigationContainer">
            <Link to="/" className="navbarLink">
              <h1 className="navLink">Popular</h1>
            </Link>
            <Link to="/top-rated" className="navbarLink">
              <h1 className="navLink">Top Rated</h1>
            </Link>
            <Link to="/upcoming" className="navbarLink">
              <h1 className="navLink">Upcoming</h1>
            </Link>
          </div>
        </nav>
        <div className="searchResultsContainer">
          {this.renderSearchMovieResult()}
        </div>
      </>
    )
  }
}

export default Header
