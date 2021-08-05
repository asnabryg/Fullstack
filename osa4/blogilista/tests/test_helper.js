const User = require("../models/user")
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Blogi 1",
    author: "ukkeli",
    url: "www.asd.com",
    likes: 100
  },
  {
    title: "Blogi 2",
    author: "tikkukko",
    url: "www.qwerty.com",
    likes: 12
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}