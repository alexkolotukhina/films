import React, {useState} from "react"

const LoginForm = () => {
  const [state, setState] = useState({
    loginEmail: "",
    loginPassword: "",
  })

  const formChange = e => {
    const {id, value} = e.target

    setState(test => ({
      ...test,
      [id]: value,
    }))
  }

  const handleSubmitForm = e => {
    e.preventDefault()
  }

  const handleLoginFormReset = e => {
    const {id} = e.target
    setState(() => ({
      [id]: "",
    }))
  }

  return (
    <form className="ui form" name="login-form">
      <h3>Login form</h3>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="loginEmail"
          placeholder="email"
          value={state.loginEmail}
          onChange={formChange}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="loginPassword"
          placeholder="password"
          value={state.loginPassword}
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
        onClick={handleLoginFormReset}
      >
        Cancel
      </button>
    </form>
  )
}

export default LoginForm
