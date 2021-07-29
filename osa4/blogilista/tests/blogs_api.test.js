const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("blog have id", async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "uusi blogi",
    author: "bloggaaja",
    url: "www.blogi.com",
    likes: 26
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain("uusi blogi")
})

test("added blog have 0 likes if likes param undefined", async () => {
  const newBlog = {
    title: "blogi ilma likejä alussa",
    author: "testikäyttäjä",
    url: "www.google.com"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

describe("blog is not added", () => {
  test("without title", async () => {
    const newBlog = {
      author: "testi",
      url: "url",
      likes: "2"
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
  })

  test("without url", async () => {
    const newBlog = {
      title: "otsikko",
      likes: 200
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
  })
})

test("remove blog", async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]
  
  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blog.title)
})

test("update blog", async () => {
  const blogs = await helper.blogsInDb()
  const newBlogInfo = {
    likes: 123
  }
  expect(blogs[0].likes).toBe(100)
  
  await api
    .put(`/api/blogs/${blogs[0].id}`)
    .send(newBlogInfo)
    .expect(200)
  
  const blogsAtEnd = await helper.blogsInDb()
  const blogAtEnd = blogsAtEnd.find(b => b.id === blogs[0].id)
  expect(blogAtEnd.likes).toBe(123)
})

afterAll(() => {
  mongoose.connection.close()
})