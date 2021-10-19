
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite, max = (undefined, 0)
  blogs.forEach(b => {
    if (b.likes > max) {
      max = b.likes
      favorite = b
    }
  });
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  authors = {}
  blogs.forEach(b => {
    if (!(b.author in authors)){
      authors[b.author] = 0
    }
    authors[b.author] += 1
  })
  let most = [undefined, 0]
  for (const [key, value] of Object.entries(authors)) {
    if (most[1] < value) {
      most = [key, value]
    }
  }
  return {author: most[0], blogs: most[1]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  authors = {}
  blogs.forEach(b => {
    if (!(b.author in authors)) {
      authors[b.author] = 0
    }
    authors[b.author] += b.likes
  })
  let most = [undefined, 0]
  for (const [key, value] of Object.entries(authors)) {
    if (most[1] < value) {
      most = [key, value]
    }
  }
  return most[0] ? {author: most[0], likes: most[1]} : most[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}