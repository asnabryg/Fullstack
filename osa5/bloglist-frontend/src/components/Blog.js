import React, { useState } from 'react'
import "../index.css"

const Blog = ({ blog, addLike, removeBlog }) => {
  const [view, setView] = useState(false)

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>
        {view ? "hide" : "view"}
      </button>
      {view
        ?
        <>
          <br />
          {blog.url} <br />
          {blog.likes}
          <button onClick={() => addLike(blog)}>
            like
          </button> <br />
          {blog.user.username} <br />
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </>
        :
        <></>
      }
    </div>
  )
}

export default Blog