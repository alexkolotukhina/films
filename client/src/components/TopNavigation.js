import React from "react"
import PropTypes from "prop-types"

import {NavLink} from "react-router-dom"

const TopNavigation = ({logout, isAuth, isAdmin}) => (
  <div className={"ui secondary pointing menu"}>
    <NavLink exact to="/" className={"item"}>
      Home
    </NavLink>
    <NavLink exact to="/films" className={"item"}>
      Films
    </NavLink>
    {isAdmin && (
      <NavLink exact to="/films/new" className={"item"}>
        <i className="icon plus"></i>Add new Films
      </NavLink>
    )}

    {isAuth ? (
      <div className={"right menu"}>
        <span onClick={logout} className={"item"}>
          Logout
        </span>
      </div>
    ) : (
      <div className={"right menu"}>
        <NavLink to="/singup" className={"item"}>
          Sing up
        </NavLink>
        <NavLink to="/login" className={"item"}>
          Login
        </NavLink>
      </div>
    )}
  </div>
)

TopNavigation.ptopTypes = {
  showAddForm: PropTypes.func.isRequired,
}

export default TopNavigation
