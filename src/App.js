import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMovie from './components/SingleMovie'
import MovieSearchItem from './components/MovieSearchItem'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/movies/:id" component={SingleMovie} />
    <Route exact path="/search" component={MovieSearchItem} />
  </Switch>
)

export default App
