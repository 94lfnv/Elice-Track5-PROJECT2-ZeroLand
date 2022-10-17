
export const loginReducer = (userState, action) => {
    switch (action.type) {
        //action type이 "LOGIN"
        case "LOGIN":
            return {
                ...userState,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...userState,
                user: null,
            }
        default:
            return userState;
    }
}