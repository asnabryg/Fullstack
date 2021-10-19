import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
  let component
  let mockHandler
  const blog = {
    title: "titleText",
    author: "authorText",
    url: "www.asd.com",
    likes: 12,
    user: {
      username: "käyttäjä"
    }
  }
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} addLike={mockHandler} />
    )
  })

  test("renders blog", () => {
    expect(component.container).toHaveTextContent("titleText")
    expect(component.container).toHaveTextContent("authorText")
    expect(component.container).not.toHaveTextContent("www.asd.com")
  })

  test("after clicking the button, hole blog is displayed", () => {
    const button = component.getByText("view")
    fireEvent.click(button)
    expect(component.container).toHaveTextContent("www.asd.com")
    expect(component.container).toHaveTextContent("12")
    expect(component.container).toHaveTextContent("käyttäjä")
  })

  test("clicking like to time works", () => {
    let button = component.getByText("view")
    fireEvent.click(button)

    button = component.getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})