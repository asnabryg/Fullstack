import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import Blog from './components/Blog'
import Toggleable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log("getAll")
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
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

  const getAllBlogsAsync = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => {
      return b.likes - a.likes
    }))
  }

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
    console.log('asd', message, color)
    dispatch(setNotification(message, color, 5))
  }

  const addBlog = async (newBlog) => {
    try {
      console.log("NewBlog:", newBlog)
      await blogService.create(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
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
    await blogService.updateBlog(blog.id, { likes: blog.likes + 1 })
    getAllBlogsAsync()
  }

  const removeBlog = async (id) => {
    await blogService.deleteBlog(id)
    getAllBlogsAsync()
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

      {/* <Notification notification={props.notification} /> */}
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

// const Notification = ({ notification }) => {
//   if (!notification || !notification.message) {
//     return null
//   }
//   return (
//     <div className="notification" style={{ color: notification.color }}>
//       {notification.message}
//     </div>
//   )
// }

export default App