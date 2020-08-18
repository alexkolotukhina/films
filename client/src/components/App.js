import React, {Component} from "react"
import {orderBy, find} from "lodash"
import FilmsPage from "./FilmsPage.js"
import FilmDetails from "../components/FilmDetails"
import HomePage from "../components/HomePage"
import {Route, Switch} from "react-router-dom"
import TopNavigation from "./TopNavigation"
import api from "../api"
// import {generate as id} from "shortid"
// import FilmsList from "./films"
// import {films} from "../data"
// import axios from "axios"
// import FilmsForm from "./forms/FilmsForm.js"
// import RegistrationForm from "./forms/RegistrationForm.js"
// import LoginForm from "./forms/LoginForm.js"

const AppContext = React.createContext()
export {AppContext}

// GET /api/films - get all films
// POST /api/films - create film// PUT /api/films/_id - update film// DELETE /api/films/_id - delete film
class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
    isLoading: true,
  }

  componentDidMount() {
    api.films.fetchAll().then(films =>
      this.setState({
        films: this.sortFilms(films),
        isLoading: false,
      }),
    )
  }

  sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id => {
    const film = find(this.state.films, {_id: id})
    return this.updateFilm({...film, featured: !film.featured})
    // this.setState(({films}) => ({
    //   films: this.sortFilms(
    //     films.map(item =>
    //       item._id === id ? {...item, featured: !item.featured} : item,
    //     ),
    //   ),
  }

  showAddForm = () => this.setState({showAddForm: true, selectedFilm: {}})
  hideAddForm = () => this.setState({showAddForm: false, selectedFilm: {}})

  // addFilm = film =>
  //   this.setState(({films, showAddForm}) => ({
  //     films: this.sortFilms([...films, {...film, _id: id()}]),
  //     showAddForm: false,
  //   }))

  addFilm = filmData =>
    api.films.create(filmData).then(film =>
      this.setState(({films}) => ({
        films: this.sortFilms([...films, {...film}]),
        showAddForm: false,
      })),
    )

  // deleteFilm = film =>
  //   this.setState(({films, selectedFilm, showAddForm}) => ({
  //     films: films.filter(item => item._id !== film._id),
  //     selectedFilm: {},
  //     showAddForm: false,
  //   }))

  deleteFilm = film =>
    api.films.delete(film).then(() =>
      this.setState(({films}) => ({
        films: this.sortFilms(films.filter(item => item._id !== film._id)),
      })),
    )

  selectFilmForEdit = selectedFilm => {
    this.setState({
      selectedFilm,
      showAddForm: true,
    })
  }

  // updateFilm = film =>
  //   this.setState(({films, showAddForm}) => ({
  //     films: this.sortFilms(
  //       films.map(item => (item._id === film._id ? film : item)),
  //     ),
  //     showAddForm: false,
  //   }))

  updateFilm = filmData =>
    api.films.update(filmData).then(film =>
      this.setState(({films}) => ({
        films: this.sortFilms(
          films.map(item => (item._id === film._id ? film : item)),
        ),
        showAddForm: false,
      })),
    )

  saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film))

  render() {
    return (
      <div className="ui container">
        <TopNavigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/films" component={FilmsPage} />
          <Route path="/film/:id" component={FilmDetails} />
        </Switch>
      </div>
    )
  }
}

export default App
