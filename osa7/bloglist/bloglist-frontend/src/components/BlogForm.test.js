import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test("<BlogForm /> onsubmit", () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector("#title")
  const inputAuthor = component.container.querySelector("#author")
  const inputUrl = component.container.querySelector("#url")
  const form = component.container.querySelector("#form")

  fireEvent.change(inputTitle, {
    target: { value: "TitleText" }
  })
  fireEvent.change(inputAuthor, {
    target: { value: "AuthorText" }
  })
  fireEvent.change(inputUrl, {
    target: { value: "www.asd.com" }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("TitleText")
  expect(createBlog.mock.calls[0][0].author).toBe("AuthorText")
  expect(createBlog.mock.calls[0][0].url).toBe("www.asd.com")
})