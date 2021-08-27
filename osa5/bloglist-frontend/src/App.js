import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import Blog from './components/Blog'
import Toggleable from "./components/Toggleable"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log("getAll")
      setBlogs(blogs)
    })
  }, [])

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
    console.log("Logging in: ", username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      setNotification(null)
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
    setNotification(null)
    setPassword("")
    setTitle("")
    setAuthor("")
    setUrl("")
    blogService.setToken(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    console.log("creating blog:", newBlog)
    try {
      await blogService.create(newBlog)
      setBlogs(await blogService.getAll())
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "green"
      )
      blogFormRef.current.toggleVisiblity()
    } catch (exception) {
      console.error(exception.message)
      handleNotification("invalid blog", "red")
    }
  }

  const handleNotification = (message, color) => {
    setNotification({
      message,
      color
    })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  return (
    <>

      {user === null
        ?
        <Toggleable buttonText="log in">
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            notification={notification}/>
        </Toggleable>
        :
        <Blogs
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          handleCreateBlog={handleCreateBlog}
          notification={notification}
          blogFormRef={blogFormRef} />
      }

    </>
  )
}

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={props.notification} />
      <form onSubmit={props.handleLogin}>
        username
        <input onChange={({ target }) => props.setUsername(target.value)} /><br />
        password
        <input type="password" onChange={({ target }) => props.setPassword(target.value)} /><br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.handleCreateBlog}>
        title:
        <input onChange={({ target }) => props.setTitle(target.value)} /><br />
        author:
        <input onChange={({ target }) => props.setAuthor(target.value)} /><br />
        url:
        <input onChange={({ target }) => props.setUrl(target.value)} /><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Blogs = (props) => {
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={props.notification} />

      <form onSubmit={props.handleLogout}>
        {props.user.username} logged in
        <button>logout</button>
      </form>
      <br />

      <Toggleable buttonText="create new blog" ref={props.blogFormRef}>
        <BlogForm
          handleCreateBlog={props.handleCreateBlog}
          setTitle={props.setTitle}
          setAuthor={props.setAuthor}
          setUrl={props.setUrl}
           />
      </Toggleable>
      <br/>

      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const Notification = ({ notification }) => {
  if (!notification || !notification.message) {
    return null
  }
  return (
    <div className="notification" style={{ color: notification.color }}>
      {notification.message}
    </div>
  )
}

export default App