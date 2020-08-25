import React, {Component} from "react"
import ReactImageFallback from "react-image-fallback"
import {Link, Redirect} from "react-router-dom"
import FormMessage from "./FormMessage"
import PropTypes from "prop-types"

const initialData = {
  title: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  img: "",
  featured: false,
  _id: null,
}
class FilmsForm extends Component {
  state = {
    data: initialData,
    errors: {},
    isLoading: false,
    redirect: false,
  }

  componentDidMount() {
    if (this.props.film.id) {
      this.setState({data: this.props.film})
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {film} = props

    if (film._id && film._id !== state.data._id) {
      return {
        data: film,
        error: {},
      }
    }

    if (!film._id && state.data._id !== null) {
      return {
        data: initialData,
        error: {},
      }
    }

    return null
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.setState({isLoading: true})
      this.props.submit(this.state.data).then(() =>
        this.setState({
          isLoading: false,
          redirect: true,
        }),
      )
    }
  }
  handleStringChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    })
  handleNumberChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: parseInt(e.target.value, 10)},
    })
  handleCheckboxChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.checked},
    })
  validate(data) {
    const errors = {}
    if (!data.title) errors.title = "This field cant be blank"
    if (!data.description) errors.description = "This field cant be blank"
    if (!data.price) errors.price = "This field cant be blank"
    if (!data.director) errors.director = "This field cant be blank"
    if (!data.duration) errors.duration = "This field cant be blank"
    if (parseInt(data.price) <= 0) errors.price = "Error price"
    if (parseInt(data.duration) <= 0) errors.duration = "Error duration"
    return errors
  }
  render() {
    const {data, errors, isLoading, redirect} = this.state
    const formClassName = isLoading ? "ui form loading" : "ui form"
    return (
      <form className={formClassName} onSubmit={this.handleSubmit}>
        {redirect && <Redirect to="/films" />}
        <div className="ui  grid">
          <div className="twelve wide column">
            <div className={errors.title ? "field error" : "field"}>
              <label>Film title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="film title"
                value={data.title}
                onChange={this.handleStringChange}
              />
              <FormMessage type="error">{errors.title}</FormMessage>
            </div>
            <div className={errors.description ? "field error" : "field"}>
              <label>Film description</label>
              <textarea
                name="description"
                id="description"
                placeholder="film description"
                onChange={this.handleStringChange}
                value={data.description}
              />
              <FormMessage type="error">{errors.description}</FormMessage>
            </div>
          </div>
          <div className="four wide column field">
            <ReactImageFallback
              src={data.img}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="thumbnail"
              className="ui image"
            />
          </div>
          <div className="twelve wide column">
            <div className={errors.img ? "field error" : "field"}>
              <label>Image</label>
              <input
                value={data.img}
                onChange={this.handleStringChange}
                type="text"
                name="img"
                id="img"
                placeholder="img"
              />
              <FormMessage>{errors.img}</FormMessage>
            </div>
          </div>
          <div className="six wide column field">
            <div className={errors.director ? "field error" : "field"}>
              <label>Director</label>
              <input
                type="text"
                name="director"
                id="director"
                placeholder="film director"
                onChange={this.handleStringChange}
                value={data.director}
              />
              <FormMessage type="error">{errors.director}</FormMessage>
            </div>
          </div>
          <div className="six wide column field">
            <div className={errors.duration ? "field error" : "field"}>
              <label>Duration</label>
              <input
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
                value={data.duration}
                onChange={this.handleNumberChange}
              />
              <FormMessage type="error">{errors.duration}</FormMessage>
            </div>
          </div>
          <div className="six wide column field">
            <div className={errors.price ? "field error" : "field"}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="price"
                value={data.price}
                onChange={this.handleNumberChange}
              />
              <FormMessage type="error">{errors.price}</FormMessage>
            </div>
          </div>
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              name="featured"
              id="featured"
              value={data.featured}
              onChange={this.handleCheckboxChange}
            />
          </div>
        </div>
        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or" />
          <Link to="/films" className="ui button">
            Hide form
          </Link>
        </div>
      </form>
    )
  }
}

FilmsForm.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
}

export default FilmsForm
