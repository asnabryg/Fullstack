
Cypress.Commands.add("createUser", ({ name, username, password }) => {
  const user = {
    name,
    username,
    password
  }
  cy.request("POST", "http://localhost:3003/api/users/", user)
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", { username, password })
    .then(({ body }) => {
      localStorage.setItem("loggedUser", JSON.stringify(body))
    })
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`
    }
  })
})