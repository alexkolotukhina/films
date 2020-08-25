import axios from "axios"

export const setAutHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Autorization = `Test ${token}`
  } else {
    delete axios.defaults.headers.common.Autorization
  }
}
