import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const deleteBlog = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return await axios.delete(baseUrl + `/${id}`, config)
}

const updateBlog = async (id, updatedBlog) => {
  return await axios.put(baseUrl + `/${id}`, updatedBlog)
}

const x = {
  getAll,
  setToken,
  create,
  updateBlog,
  deleteBlog
}
export default x
