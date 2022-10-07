const initialState = {
    userPageState: "none",
};

export default function addUserPageStateReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USERPAGE": {
            return {
                ...state,
                userPageState: action.payload, // login or register
            };
        }
        case "CANCEL_USERPAGE": {
            return {
                ...state,
                userPageState: "none",
            };
        }
        default:
            return state;
    }
}
