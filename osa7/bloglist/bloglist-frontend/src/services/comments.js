/* eslint-disable */
import axios from 'axios'

const baseUrl = "/api/comments"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const addComment = async (comment, blogId) => {
    const response = await axios.post(baseUrl + `/${blogId}`, comment)
    return response.data
}

const x = {
    getAll,
    addComment
}
export default x