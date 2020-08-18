import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import api from "../api.js"
import {useParams} from "react-router-dom"

const FilmDetails = () => {
  let {id} = useParams()
  const [film, setFilm] = useState({})

  const style = {
    display: "flex",
    marginTop: "30px",
  }

  const styleMain = {
    paddingLeft: "30px",
  }

  const styleDesc = {
    marginTop: "20px",
  }

  useEffect(() => {
    api.films.fetchAll().then(films => {
      let film = films.filter(item => item._id === id)
      film.map(item =>
        setFilm({
          ...item,
        }),
      )
    })
  }, [id])

  return (
    <div>
      <div className="film-details" style={style}>
        <div className="film-details__image">
          {film.img && <img src={film.img} alt={film?.title} />}
        </div>
        <div className="film-details__main" style={styleMain}>
          {film.title && (
            <h1>
              {film.title} {film.price && <span>$ {film.price}</span>}
            </h1>
          )}
          <div className="meta">
            <i className="icon users" /> {film?.director}
            <span className="right floated">
              <i className="icon wait right" /> {film?.duration} min
            </span>
          </div>
          {film.description && (
            <div className="film-details__desc" style={styleDesc}>
              {film.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

FilmDetails.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }),
}

export default FilmDetails
