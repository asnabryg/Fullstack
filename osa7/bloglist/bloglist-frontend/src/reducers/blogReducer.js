/* eslint-disable */
import blogService from "../services/blogs"

export const getBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: "GET_BLOGS",
			data: blogs.sort((a, b) => {return b.likes - a.likes})
		})
	}
}

export const createBlog = (content) => {
	return async dispatch => {
		const newBlog = await blogService.create(content)
		dispatch({
			type: "CREATE",
			data: newBlog
		})
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
		case "GET_BLOGS":
			return action.data
			
		case "CREATE":
			return state.concat(action.data)
		
		default:
			return state
  }
}

export default reducer