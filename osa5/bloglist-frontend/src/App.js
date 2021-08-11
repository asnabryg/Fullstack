import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      return
    }
    console.log("Logging: ", username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.error("wrong credentials, ", exception.message)
    }
  }

  return (
    <>

      {user === null
        ? <Login
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}/>
        : <Blogs
            user={user}
            blogs={blogs}/>
      }

    </>
  )
}

const Login = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        username
        <input onChange={({target}) => props.setUsername(target.value)}/><br/>
        password
        <input onChange={({target}) => props.setPassword(target.value)}/><br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Blogs = ({user, blogs}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App