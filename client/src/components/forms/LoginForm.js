// import React, {useState} from "react"

// const LoginForm = () => {
//   const [state, setState] = useState({
//     loginEmail: "",
//     loginPassword: "",
//   })

//   const formChange = e => {
//     const {id, value} = e.target

//     setState(test => ({
//       ...test,
//       [id]: value,
//     }))
//   }

//   const handleSubmitForm = e => {
//     e.preventDefault()
//   }

//   const handleLoginFormReset = e => {
//     const {id} = e.target
//     setState(() => ({
//       [id]: "",
//     }))
//   }

//   return (
//     <form className="ui form" name="login-form">
//       <h3>Login form</h3>
//       <div className="field">
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           id="loginEmail"
//           placeholder="email"
//           value={state.loginEmail}
//           onChange={formChange}
//         />
//       </div>
//       <div className="field">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           id="loginPassword"
//           placeholder="password"
//           value={state.loginPassword}
//           onChange={formChange}
//         />
//       </div>
//       <button
//         className="ui button primary"
//         type="submit"
//         onClick={handleSubmitForm}
//       >
//         Ok
//       </button>
//       <button
//         className="ui button success"
//         type="reset"
//         onClick={handleLoginFormReset}
//       >
//         Cancel
//       </button>
//     </form>
//   )
// }

// export default LoginForm

import React from "react"
import {Link} from "react-router-dom"
import FormMessage from "./FormMessage"
const initialData = {
  email: "",
  password: "",
}
class LoginForm extends React.Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  }
  handleChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
      errors: {...this.state.errors, [e.target.name]: ""},
    })
  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.setState({loading: true})
      this.props
        .submit(this.state.data)
        .catch(error =>
          this.setState({errors: error.response.data.errors, loading: false}),
        )
    }
  }
  validate(data) {
    const errors = {}
    if (!data.email) errors.email = "Email cannot be blank"
    if (!data.password) errors.password = "Password cannot be blank"
    return errors
  }
  render() {
    const {data, errors, loading} = this.state
    const cls = loading ? "ui form loading" : "ui form"
    return (
      <form className={cls} onSubmit={this.handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.email}</FormMessage>
        </div>
        <div className={errors.password ? "error field" : "field"}>
          <label>Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={data.password}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.password}</FormMessage>
        </div>
        <div className="ui fluid buttons">
          <button className="ui button primary">Login</button>
          <div className="or" />
          <Link to="/" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    )
  }
}
export default LoginForm
