import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import Blog from './components/Blog'
import Toggleable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import { setNotification } from "./reducers/notificationReducer"
import { getBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    dispatch(getBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  console.log('BLOGS' , blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      console.log("getLoggedUser")
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      return
    }

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      handleNotification("wrong username or password", "red")
      console.error("wrong credentials, ", exception.message)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log("logging out")
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    setUsername("")
    dispatch(setNotification(null, null, null))
    setPassword("")
    blogService.setToken(null)
  }

  const handleNotification = (message, color) => {
    dispatch(setNotification(message, color, 5))
  }

  const addBlog = async (newBlog) => {
    try {
      console.log("NewBlog:", newBlog)
      dispatch(createBlog(newBlog))
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "green"
      )
      blogFormRef.current.toggleVisiblity()
      return true
    } catch (exception) {
      console.error(exception.message)
      handleNotification("invalid blog", "red")
      return false
    }
  }

  const addLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <>

      {user === null
        ?
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin} />
        :
        <Blogs
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          addBlog={addBlog}
          blogFormRef={blogFormRef}
          addLike={addLike}
          removeBlog={removeBlog} />
      }

    </>
  )
}

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={props.handleLogin}>
        username
        <input id="username" onChange={({ target }) => props.setUsername(target.value)} /><br />
        password
        <input id="password" type="password" onChange={({ target }) => props.setPassword(target.value)} /><br />
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}

const Blogs = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <form onSubmit={props.handleLogout}>
        {props.user.username} logged in
        <button>logout</button>
      </form>
      <br />

      <Toggleable buttonText="create new blog" ref={props.blogFormRef}>
        <BlogForm
          createBlog={props.addBlog} />
      </Toggleable>
      <br />

      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={props.addLike} removeBlog={props.removeBlog} />
      )}
    </div>
  )
}

export default App