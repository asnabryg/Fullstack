import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const LoginForm = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('login error')
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem("user-token", token)
      props.setPage("authors")
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        name:
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /> <br />
        password:
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /> <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
