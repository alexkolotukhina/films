import React from "react"
import PropTypes from "prop-types"

import {NavLink} from "react-router-dom"

const TopNavigation = ({showAddForm}) => (
  // <div className={"ui secondary pointing menu"}>
  //   <a href="/" className={"item"}>
  //     Home
  //   </a>
  //   <a href="#" className={"item"} onClick={showAddForm}>
  //     <i className={"icon plus"}>Add</i>
  //   </a>
  // </div>
  <div className={"ui secondary pointing menu"}>
    <NavLink exact to="/" className={"item"}>
      Home
    </NavLink>
    <NavLink exact to="/films" className={"item"}>
      Films
    </NavLink>
    <NavLink exact to="/films/new" className={"item"}>
      <i className="icon plus"></i>Add new Films
    </NavLink>
  </div>
)

TopNavigation.ptopTypes = {
  showAddForm: PropTypes.func.isRequired,
}

export default TopNavigation
