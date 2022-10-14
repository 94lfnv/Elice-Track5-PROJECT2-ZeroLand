
export const loginReducer (state, action) => {
    switch (action.type) {
        //action type이 "LOGIN"
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}