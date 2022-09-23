const initialState = {
    selectedMenuName: "none",
};

export default function addMenuSelectReducer(state = initialState, action) {
    switch (action.type) {
        case "SELECT": {
            return {
                //...state,
                selectedMenuName: action.payload,
            };
        }
        case "CANCEL": {
            return {
                //...state,
                selectedMenuName: "none",
            };
        }
        default:
            return state;
    }
}
