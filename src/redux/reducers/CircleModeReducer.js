const initialState = {
    isCircleMode: false,
};

export default function addCircleModeReducer(state = initialState, action) {
    switch (action.type) {
        case "TOGGLE_CIRCLE_MODE": {
            return {
                ...state,
                isCircleMode: !state.isCircleMode,
            };
        }
        case "SET_CIRCLE_MODE": {
            return {
                ...state,
                isCircleMode: action.payload,
            };
        }
        default:
            return state;
    }
}
