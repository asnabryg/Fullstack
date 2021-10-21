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
import { getUsers } from './reducers/usersReducer'
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import Navibar from './components/Navibar'
import { addComment } from "./reducers/commentReducer"
import { Button, Form } from "react-bootstrap"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBlogs())
  }, [dispatch])

  const users = useSelector(({ users }) => {
    return users
  })

  useEffect(() => {
    dispatch(getLoggedUserJSON())
  }, [])

  const user = useSelector(({ user }) => {
    return user
  })

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const userMatch = useRouteMatch("/users/:id")
  const userById = userMatch && users
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch("/blogs/:id")
  const blogById = blogMatch && blogs
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null
  if (blogById) {
    console.log('blog', blogById)
  }


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

  const createComment = async () => {
    dispatch(addComment(comment, blogById.id))
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
          <Navibar
            loggedUser={user.username}
            handleLogout={handleLogout} />
          <div class="container">
            <h2>blogs</h2>
            <Notification />

            <form onSubmit={handleLogout}>
              <p>{user.username} logged in</p>
              <Button type="submit">logout</Button>
            </form>

            <Switch>
              <Route path="/blogs/:id">
                {blogById
                  ?
                  <div>
                    <h2>{blogById.title}</h2>
                    <p>
                      <a href={"//" + blogById.url}>{blogById.url}</a><br />
                      {blogById.likes} likes <Button onClick={() => addLike(blogById)}>like</Button><br />
                      added by {blogById.user.username}
                    </p>
                    <h4>comments</h4>
                    <form onSubmit={createComment}>
                      <input type="text" onChange={({ target }) => setComment(target.value)} value={comment}></input>
                      <Button>add comment</Button>
                    </form>
                    {blogById.comments
                      ?
                      <ul>
                        {blogById.comments.map(c => 
                          <li key={c.id}>{c.text}</li>)}
                      </ul>
                      : null}
                  </div>
                  : null
                }
              </Route>

              <Route path="/users/:id">
                {userById
                  ?
                  <div>
                    <h2>{userById.username}</h2>
                    <h3>added blogs</h3>
                    <ul>
                      {userById.blogs.map(b =>
                        <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>)}
                    </ul>
                  </div>
                  :
                  null
                }
              </Route>

              <Route path="/users">
                <h2>Users</h2>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>blogs created</th>
                    </tr>
                    {users
                      ? users.map(u =>
                        <tr key={u.id}>
                          <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
                          <td>{u.blogs.length}</td>
                        </tr>)
                      : null}
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
        </div>
      }

    </>
  )
}

const LoginForm = (props) => {
  return (
    <div class="container">
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={props.handleLogin}>
        username
        <Form.Control id="username" style={{width: 300}}onChange={({ target }) => props.setUsername(target.value)} /><br />
        password
        <Form.Control style={{ width: 300 }} id="password" type="password" onChange={({ target }) => props.setPassword(target.value)} /><br />
        <Button id="login-btn" type="submit">login</Button>
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