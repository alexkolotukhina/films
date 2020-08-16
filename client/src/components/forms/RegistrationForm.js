import React, {useState} from "react"

const RegistrationForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    cofirmPassword: "",
  })

  const formChange = e => {
    const {id, value} = e.target

    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmitForm = e => {
    e.preventDefault()

    if (state.password === state.cofirmPassword) {
      console.log("form submit")
    } else {
      console.log("password error")
    }
  }

  const handleFormReset = e => {
    const {id} = e.target
    setState(() => ({
      [id]: "",
    }))
  }

  return (
    <form className="ui form" name="register-form">
      <h3>Registration form</h3>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={state.email}
          onChange={formChange}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={state.password}
          onChange={formChange}
        />
      </div>
      <div className="field">
        <label>Confirm password</label>
        <input
          type="password"
          name="cofirm_password"
          id="cofirmPassword"
          placeholder="cofirm password"
          value={state.cofirmPassword}
          onChange={formChange}
        />
      </div>
      <button
        className="ui button primary"
        type="submit"
        onClick={handleSubmitForm}
      >
        Ok
      </button>
      <button
        className="ui button success"
        type="reset"
        onClick={handleFormReset}
      >
        Cancel
      </button>
    </form>
  )
}

export default RegistrationForm
