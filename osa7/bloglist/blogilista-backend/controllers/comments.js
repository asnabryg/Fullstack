const commentRouter = require("express").Router()
const Comment = require("../models/comment")
const Blog = require("../models/blog")
require("express-async-errors")

commentRouter.get("/", async (request, response) => {
    const comments = await Comment.find({}).populate("blog", {
        id: 1, title: 1
    })
    response.json(comments.map(c => c.toJSON()))
})

commentRouter.post("/:id", async (request, response) => {
    const body = request.body
    if (!body.text) {
        return response.status(400).json({
            error: "invalid comment"
        })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(400).json({
            error: "Id is wrong or blog is deleted"
        })
    }
    const comment = new Comment({
        text: body.text,
        blog: blog._id
    })
    const savedComment = await comment.save()
    console.log('savedComment', savedComment)
    if (blog.comments) {
        blog.comments = blog.comments.concat(savedComment._id)
    } else {
        blog.comments = [savedComment._id]
    }
    await blog.save()

    response.status(201).json(savedComment.toJSON())
})

module.exports = commentRouter