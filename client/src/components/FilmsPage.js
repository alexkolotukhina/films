import React, {Component} from "react"
import FilmsList from "./films"
import {orderBy, find} from "lodash"
import {Route, Switch, Redirect} from "react-router-dom"
import FilmsForm from "./forms/FilmsForm.js"
import {AppContext} from "./App.js"
import api from "../api.js"

// GET /api/films - get all films
// POST /api/films - create film// PUT /api/films/_id - update film// DELETE /api/films/_id - delete film
class FilmsPage extends Component {
  state = {
    films: [],
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
  }

  showAddForm = () => this.setState({showAddForm: true, selectedFilm: {}})
  hideAddForm = () => this.setState({showAddForm: false, selectedFilm: {}})

  addFilm = filmData =>
    api.films.create(filmData).then(film =>
      this.setState(({films}) => ({
        films: this.sortFilms([...films, {...film}]),
        showAddForm: false,
      })),
    )

  deleteFilm = film =>
    api.films.delete(film).then(() =>
      this.setState(({films}) => ({
        films: this.sortFilms(films.filter(item => item._id !== film._id)),
      })),
    )

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
    const {films} = this.state
    const numCol = this.props.location.pathname === "/films" ? "sixteen" : "ten"

    return (
      <AppContext.Provider
        value={{
          toggleFeatured: this.toggleFeatured,
          deleteFilm: this.deleteFilm,
          user: this.props.user,
        }}
      >
        <div className="ui stackable grid">
          {this.props.user.role === "admin" ? (
            <Switch>
              <Route
                path="/films/new"
                render={() => (
                  <div className={"six whide column"}>
                    <FilmsForm submit={this.saveFilm} film={{}} />
                  </div>
                )}
              />

              <Route
                path="/films/edit/:_id"
                render={props => (
                  <div className="six whide column">
                    <FilmsForm
                      submit={this.saveFilm}
                      film={find(films, {_id: props.match.params._id}) || {}}
                    />
                  </div>
                )}
              />
            </Switch>
          ) : (
            <Route path="/films/*" render={() => <Redirect to="/films" />} />
          )}
        </div>

        <div className={`${numCol} wide column`}>
          <div className={"six wide column"}>
            {this.state.isLoading ? (
              <div className="ui icon message">
                <i className="notched circle loading icon" />
                <div className="content">
                  <div className="header">films loading</div>
                </div>
              </div>
            ) : (
              <FilmsList films={films} />
            )}
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

export default FilmsPage
