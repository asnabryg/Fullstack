const blogsRouter = require("express").Router()
const { response } = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
require("express-async-errors")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1, name: 1, id: 1
  })
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "invalid blog"
    })
  }
  let user = await User.find({})
  user = user[0]

  const blog = new Blog({
    title: body.title,
    author: body.author ? body.author : "",
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response, next) => {
    const oldBlog = await Blog.findById(request.params.id)
    const newBlog = { ...oldBlog._doc, ...request.body }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter