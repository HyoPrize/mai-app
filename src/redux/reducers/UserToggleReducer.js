const initialState = {
    userToggle: false,
};

export default function addUserToggleReducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN": {
            // return {
            //     ...state,
            //     userToggle: true,
            // };
            return { userToggle: true };
        }
        case "CLOSE": {
            return { userToggle: false };
            // return {
            //     ...state,
            //     userToggle: false,
            // };
        }
        default:
            return state;
    }
}
