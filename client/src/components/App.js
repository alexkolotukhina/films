import React, {Component} from "react"
import FilmDetails from "../components/FilmDetails"
import {Route, Switch} from "react-router-dom"
import TopNavigation from "./TopNavigation"
import {Async, lazyImport} from "./Async"
import {setAutHeader} from "../utils"
import jwtDecode from "jwt-decode"

const AppContext = React.createContext()
export {AppContext}

const HomePage = Async(lazyImport("./HomePage"))
const FilmsPage = Async(lazyImport("./FilmsPage"))
const SignupPage = Async(lazyImport("./SignupPage"))
const LoginPage = Async(lazyImport("./LoginPage"))
class App extends Component {
  state = {
    user: {
      token: null,
      role: "user",
    },
    message: "",
  }

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({
        user: {
          token: localStorage.filmsToken,
          role: jwtDecode(localStorage.filmsToken).user.role,
        },
      })
      setAutHeader(localStorage.filmsToken)
    }
  }

  login = token => {
    this.setState({
      user: {
        token,
        role: jwtDecode(token).user.role,
      },
    })
    localStorage.filmsToken = token
    setAutHeader(token)
  }

  logout = () => {
    this.setState({user: {token: null, role: "user"}})
    setAutHeader()
    delete localStorage.filmsToken
  }

  setMessage = message => this.setState({message})

  render() {
    const {user, message} = this.state
    const isUserAdmin = this.state.user.role === "admin"

    return (
      <div className="ui container">
        <TopNavigation
          logout={this.logout}
          isAuth={user.token}
          isAdmin={isUserAdmin}
        />

        {/* {message && (
          <div className={"ui info message"}>
            <i className={"close icon"} onClick={() => this.setMessage("")} />
            {message}
          </div>
        )} */}

        {message && (
          <div className={"ui info message"}>
            <i className={"close icon"} onClick={() => this.setMessage("")} />
            {message}
          </div>
        )}

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/films"
            render={props => <FilmsPage {...props} user={this.state.user} />}
          />
          <Route path="/film/:id" component={FilmDetails} />
          <Route
            path="/singup"
            render={props => (
              <SignupPage {...props} setMessage={this.setMessage}></SignupPage>
            )}
          />
          <Route
            path="/login"
            render={props => <LoginPage {...props} login={this.login} />}
          />
        </Switch>
      </div>
    )
  }
}

export default App
