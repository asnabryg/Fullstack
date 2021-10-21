/* eslint-disable */
import commentService from "../services/comments"

export const addComment = (comment, blogId) => {
    return async dispatch => {
        const c = {
            text: comment
        }
        console.log('comment', c, blogId)
        const newComment = await commentService.addComment(c, blogId)
        dispatch({
            type: "ADD_COMMENT",
            data: newComment
        })
    }
}

export const getComments = () => {
    return async dispatch => {
        const allComments = await commentService.getAll()
        dispatch({
            type: "GET_COMMENTS",
            data: allComments
        })
    }
}

const reducer = (state=[], action) => {
    switch (action.type) {
        case "GET_COMMENTS":
            return action.data
        
        case "ADD_COMMENT":
            return state.concat(action.data)
    
        default:
            return state
    }
}

export default reducer