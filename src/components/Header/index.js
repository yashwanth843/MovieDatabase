import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    const {history} = this.props
    if (searchInput) {
      history.push(`/search/${searchInput}`)
    }
    this.setState({searchInput: ''})
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
              value={searchInput}
              onChange={this.onChangeSearch}
              role="textbox"
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
      </>
    )
  }
}

export default withRouter(Header)
