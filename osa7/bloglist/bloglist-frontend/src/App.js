/* eslint-disable */
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
import { getLoggedUserJSON, login, logout } from "./reducers/userReducer"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import userService from "./services/users"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    dispatch(getBlogs())
  }, [dispatch])

  const user = useSelector(({ user }) => {
    return user
  })
  // console.log('USER', user)

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  // console.log('BLOGS' , blogs)

  useEffect(() => {
    dispatch(getLoggedUserJSON())
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      return
    }
    dispatch(login(username, password))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log("logging out")
    dispatch(logout())
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
        <div>
          <h2>blogs</h2>
          <Notification />

          <form onSubmit={handleLogout}>
            <p>{user.username} logged in</p>
            <button>logout</button>
          </form>
          <Switch>
            <Route path="/users">
              <h2>Users</h2>
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>blogs created</th>
                  </tr>
                  {users.map(user =>
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Route>

            <Route path="/">
              <Blogs
                user={user}
                blogs={blogs}
                handleLogout={handleLogout}
                addBlog={addBlog}
                blogFormRef={blogFormRef}
                addLike={addLike}
                removeBlog={removeBlog} />
            </Route>
          </Switch>
        </div>
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