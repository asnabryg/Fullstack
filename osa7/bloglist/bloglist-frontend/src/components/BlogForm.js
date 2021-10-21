import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"

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
        <Form.Control style={{ width: 300 }} id="title" onChange={({ target }) => setTitle(target.value)} value={title}/><br />
        author:
        <Form.Control style={{ width: 300 }} id="author" onChange={({ target }) => setAuthor(target.value)} value={author} /><br />
        url:
        <Form.Control style={{ width: 300 }} id="url" onChange={({ target }) => setUrl(target.value)} value={url} /><br />
        <Button id="create-btn" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm