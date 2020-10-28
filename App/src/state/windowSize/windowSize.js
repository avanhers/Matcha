import { SET_SIZE_STATE } from "../actionConst.js"

const initialState = ""
const sizeState = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIZE_STATE:
            return action.payload;
        default:
            return state;
    }
}

export default sizeState