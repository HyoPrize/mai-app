const initialState = {
    menuLevel: 0,
};

export default function addMenuLevelReducer(state = initialState, action) {
    switch (action.type) {
        case "UP": {
            return {
                //...state,
                menuLevel: state.menuLevel + 1,
            };
        }
        case "DOWN": {
            return {
                //...state,
                menuLevel: state.menuLevel - 1,
            };
        }
        case "RESET": {
            return {
                //...state,
                menuLevel: 0,
            };
        }
        case "SET_LEVEL": {
            return {
                //...state,
                menuLevel: action.payload,
            };
        }
        default:
            return state;
    }
}
