const bcrypt = require("bcrypt")
const { response } = require("express")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

usersRouter.post("/", async (request, response) => {
  const body = request.body
  if (!body.password) {
    return response.status(400).json({
      error: "Password is required."
    })
  }
  if (body.password.length < 3) {
    return response.status(400).json({
      error: "Password is too short."
    })
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter