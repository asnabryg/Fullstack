const { ApolloServer, gql } = require("apollo-server")
require("dotenv").config()
const mongoose = require("mongoose")
const Book = require("./models/Book")
const Author = require("./models/Author")
const jwt = require("jsonwebtoken")

const MONGODB_URI = process.env.MONGODB_URL
const JWT_SECRET = process.env.SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let returnBooks = await Book.find({}).populate("author")
      if (args.author) {
        returnBooks = returnBooks.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        returnBooks = returnBooks.filter(b => b.genres.includes(args.genre))
      }
      return returnBooks

    },
    allAuthors: async () => await Author.find({})
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author")
      return books.filter(b => b.author.name == root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres
      })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return await author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})