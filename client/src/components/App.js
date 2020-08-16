import React, {Component} from "react"
import {generate as id} from "shortid"
import FilmsList from "./films"
import {orderBy} from "lodash"
import {films} from "../data"
import FilmsForm from "./forms/FilmsForm.js"
import TopNavigation from "./TopNavigation.js"
import RegistrationForm from "./forms/RegistrationForm.js"
import LoginForm from "./forms/LoginForm.js"

const AppContext = React.createContext()
export {AppContext}

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: "",
  }

  componentDidMount() {
    this.setState({
      films: this.sortFilms(films),
    })
  }

  sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id =>
    this.setState(({films}) => ({
      films: this.sortFilms(
        films.map(item =>
          item._id === id ? {...item, featured: !item.featured} : item,
        ),
      ),
    }))

  showAddForm = () => this.setState({showAddForm: true, selectedFilm: {}})
  hideAddForm = () => this.setState({showAddForm: false, selectedFilm: {}})

  addFilm = film =>
    this.setState(({films, showAddForm}) => ({
      films: this.sortFilms([...films, {...film, _id: id()}]),
      showAddForm: false,
    }))

  deleteFilm = film =>
    this.setState(({films, selectedFilm, showAddForm}) => ({
      films: films.filter(item => item._id !== film._id),
      selectedFilm: {},
      showAddForm: false,
    }))

  selectFilmForEdit = selectedFilm => {
    this.setState({
      selectedFilm,
      showAddForm: true,
    })
  }

  updateFilm = film =>
    this.setState(({films, showAddForm}) => ({
      films: this.sortFilms(
        films.map(item => (item._id === film._id ? film : item)),
      ),
      showAddForm: false,
    }))

  saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film))

  render() {
    const {films, showAddForm, selectFilm} = this.state
    const numCol = showAddForm ? "ten" : "sixteen"

    return (
      <AppContext.Provider
        value={{
          toggleFeatured: this.toggleFeatured,
          editFilm: this.selectFilmForEdit,
          deleteFilm: this.deleteFilm,
        }}
      >
        <div className="ui container mt-3">
          <RegistrationForm />
          <LoginForm />
          <TopNavigation showAddForm={this.showAddForm} />

          <div className={"ui stackable grid"}>
            {this.state.showAddForm && (
              <div>
                <div className={""}>
                  <FilmsForm
                    submit={this.saveFilm}
                    hideAddForm={this.hideAddForm}
                    film={this.state.selectedFilm}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`${numCol}`}>
            <div className={"six wide column"}>
              <FilmsList films={films} />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
