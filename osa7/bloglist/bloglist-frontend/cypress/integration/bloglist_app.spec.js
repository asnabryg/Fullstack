
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.createUser({
      name: "Testiukko",
      username: "testiukko",
      password: "salasana"
    })
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("log in to application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testiukko")
      cy.get("#password").type("salasana")
      cy.get("#login-btn").click()

      cy.contains("testiukko logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testiukko")
      cy.get("#password").type("salsana")
      cy.get("#login-btn").click()

      cy.get(".notification")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testiukko", password: "salasana" })
      cy.createBlog({ title: "blogi1", author: "bloggaaja1", url: "www.asd1.com" })
      cy.createBlog({ title: "blogi2", author: "bloggaaja2", url: "www.asd2.com" })
      cy.createBlog({ title: "blogi3", author: "bloggaaja3", url: "www.asd3.com" })
      cy.visit("http://localhost:3000")
    })

    describe("a blog can be", function () {
      it("created", function () {
        cy.contains("create new blog").click()
        cy.get("#title").type("otsikko")
        cy.get("#author").type("kirjoittaja")
        cy.get("#url").type("www.asd.com")
        cy.get("#create-btn").click()

        cy.contains("otsikko")
        cy.contains("kirjoittaja")
      })

      it("liked", function () {
        cy.contains("blogi1").contains("view").click()
        cy.contains("blogi1").contains("0")
        cy.contains("blogi1").contains("like").click()
        cy.contains("blogi1").contains("1")
      })

      it("deleted", function () {
        cy.contains("blogi1").contains("view").click()
        cy.contains("blogi1").contains("remove").click()
        cy.get("html").should("not.contain", "blogi1")
      })

      it("not deleted by wrong user", function () {
        cy.createUser({ name: "Ukko", username: "ukko", password: "salainen" })
        cy.login({ username: "ukko", password: "salainen" })
        cy.visit("http://localhost:3000")
        cy.contains("blogi1").contains("view").click()
        cy.contains("blogi1").contains("remove").click()
        cy.get("html").should("contain", "blogi1")
      })
    })

    it("blogs are sorted by likes", function () {
      cy.wait(1000)
      cy.contains("blogi2").contains("view").click()
      cy.contains("blogi2").contains("like").click()
      cy.wait(300)
      cy.contains("blogi2").contains("like").click()
      cy.wait(300)
      cy.contains("blogi2").contains("like").click()
      cy.wait(300)
      cy.contains("blogi2").contains("3")

      cy.contains("blogi3").contains("view").click()
      cy.contains("blogi3").contains("like").click()
      cy.wait(300)
      cy.contains("blogi3").contains("like").click()
      cy.wait(300)
      cy.contains("blogi3").contains("2")

      cy.get(".blogStyle").eq(0).contains("blogi2")
      cy.get(".blogStyle").eq(1).contains("blogi3")
      cy.get(".blogStyle").eq(2).contains("blogi1")
    })
  })
})