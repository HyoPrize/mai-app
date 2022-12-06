const initialState = {
    circles: [],
};

export default function addCircleReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_CIRCLE": {
            let circle = action.payload;
            state.circles.push(circle);
            return { ...state };
        }
        case "DELETE_CIRCLE": {
            const updatedCircles = state.circles.filter((circle) => circle !== action.payload);
            return { ...state, circles: updatedCircles };
        }
        case "INIT_CIRCLE": {
            return {
                ...state,
                circles: [],
            };
        }
        default:
            return state;
    }
}
