const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
require("express-async-errors")

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "invalid blog"
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author ? body.author : "",
    url: body.url,
    likes: body.likes ? body.likes : 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

module.exports = blogsRouter