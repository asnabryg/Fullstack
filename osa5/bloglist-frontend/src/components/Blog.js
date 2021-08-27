import React, { useState } from 'react'
import "../index.css"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const addLike = async () => {
    console.log("update")
    await blogService.updateBlog(blog.id, { likes: blog.likes + 1 })
    blog.likes = blog.likes + 1
    setRefresh(!refresh)
  }

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
          <button onClick={addLike}>
            like
          </button> <br />
          {blog.user.username}
        </>
        :
        <></>
      }
    </div>
  )
}

export default Blog