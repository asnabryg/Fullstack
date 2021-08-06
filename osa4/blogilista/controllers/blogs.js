const blogsRouter = require("express").Router()
const { response } = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
require("express-async-errors")

const checkToken = token => {
  console.log("2", token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log("3", decodedToken)
  if (!token || !decodedToken.id) {
    console.log("4")
    return response.status(401).json({
      error: "token missing or invalid"
    })
  }
  console.log("läpi")
  return decodedToken
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1, name: 1, id: 1
  })
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  console.log("1")
  const decodedToken = checkToken(request.token)
  console.log("läpi2")

  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "invalid blog"
    })
  }
  let user = await User.findById(decodedToken.id)

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