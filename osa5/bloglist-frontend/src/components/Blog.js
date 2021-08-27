import React, { useState } from 'react'
import "../index.css"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>
        {view ? "hide": "view"}
      </button>
      {view
        ?
        <>
          <br/>
          {blog.url} <br />
          {blog.likes}
          <button>like</button> <br/>
          {blog.user.username}
        </>
        :
        <></>
      }
    </div>
  )
}

export default Blog