const initialState = {
    mainColor: "#FFB17A80",
    subColor: "#fffded80",
};

export default function addColorReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_MAIN_COLOR": {
            return {
                ...state,
                mainColor: action.payload,
            };
        }
        case "SET_SUB_COLOR": {
            return {
                ...state,
                subColor: action.payload,
            };
        }
        default:
            return state;
    }
}
