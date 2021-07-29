
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

module.exports = {
  initialBlogs,
  blogsInDb
}