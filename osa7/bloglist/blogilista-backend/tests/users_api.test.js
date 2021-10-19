const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", name: "Root", passwordHash })
    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mixu",
      name: "Mixu",
      password: "salasana"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "root",
      name: "asd",
      password: "salasana123"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails if username length < 3", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "as",
      name: "asd",
      password: "salasana123"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("is shorter than the minimum allowed length")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails if password length < 3", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "testi",
      name: "asd",
      password: "12"
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Password is too short")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})