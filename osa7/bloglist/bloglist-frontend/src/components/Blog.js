import React, { useState } from 'react'
import "../index.css"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const Blog = ({ blog, addLike, removeBlog }) => {
  const [view, setView] = useState(false)

  return (
    <div className="blogStyle">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
      <Button onClick={() => setView(!view)}>
        {view ? "hide" : "view"}
      </Button>
      {view
        ?
        <>
          <br />
          {blog.url} <br />
          {blog.likes}
          <Button onClick={() => addLike(blog)}>
            like
          </Button> <br />
          {blog.user.username} <br />
          <Button onClick={() => removeBlog(blog.id)}>remove</Button>
        </>
        :
        <></>
      }
    </div>
  )
}

export default Blog