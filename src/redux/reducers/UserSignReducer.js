const initialState = {
    userSign: "none",
};

export default function addUserSignReducer(state = initialState, action) {
    switch (action.type) {
        case "SIGNIN": {
            return {
                ...state,
                userSign: "signIn",
            };
        }
        case "SIGNUP": {
            return {
                ...state,
                userSign: "signUp",
            };
        }
        case "CANCEL": {
            return {
                ...state,
                userSign: "none",
            };
        }
        default:
            return state;
    }
}
