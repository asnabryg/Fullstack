/* eslint-disable */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import loginService from "../services/login"

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch({
        type: "LOGIN",
        data: user
      })
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "red", 5))
      console.error("wrong credentials, ", exception.message)
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem("loggedUser")
  return async dispatch => {
    dispatch({
      type: "LOGOUT"
    })
  }
}

export const getLoggedUserJSON = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser")
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return async dispatch => {
      dispatch({
        type: "SET_USER",
        data: user
      })
    }
  } else {
    return async dispatch => {
      dispatch({
        type: "NULL",
        data: null
      })
    }
  }
}



const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data

    case "LOGOUT":
      return null

    case "SET_USER":
      return action.data

    default:
      return state;
  }
}

export default reducer