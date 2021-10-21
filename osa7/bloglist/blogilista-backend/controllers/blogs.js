const blogsRouter = require("express").Router()
const { response } = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
const tokenExtractor = require("../utils/middleware").tokenExtractor
const userExtractor = require("../utils/middleware").userExtractor
require("express-async-errors")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1, name: 1, id: 1
  }).populate("comments", {id: 1, text: 1})
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', [tokenExtractor, userExtractor], async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "invalid blog"
    })
  }
  let user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author ? body.author : "",
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
    comments: []
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", [tokenExtractor, userExtractor], async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({
      error: "Id is wrong or blog is already deleted"
    })
  }
  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: "Wrong user; you can only delete your own blogs"
    })
  }

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