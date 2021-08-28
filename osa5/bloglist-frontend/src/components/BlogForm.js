import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()
    const created = await createBlog(
      { title,
        author,
        url
      })
    console.log("created:", created)
    if (created) {
      setTitle("")
      setAuthor("")
      setUrl("")
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form id="form" onSubmit={addBlog}>
        title:
        <input id="title" onChange={({ target }) => setTitle(target.value)} value={title}/><br />
        author:
        <input id="author" onChange={({ target }) => setAuthor(target.value)} value={author} /><br />
        url:
        <input id="url" onChange={({ target }) => setUrl(target.value)} value={url} /><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm