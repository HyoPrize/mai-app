const initialState = {
    menuLevel: 0,
};

export default function addMenuLevelReducer(state = initialState, action) {
    switch (action.type) {
        case "UP_MENU_LEVEL": {
            return {
                ...state,
                menuLevel: state.menuLevel + 1,
            };
        }
        case "DOWN_MENU_LEVEL": {
            return {
                ...state,
                menuLevel: state.menuLevel - 1,
            };
        }
        case "RESET_MENU_LEVEL": {
            return {
                ...state,
                menuLevel: 0,
            };
        }
        case "SET_MENU_LEVEL": {
            return {
                ...state,
                menuLevel: action.payload,
            };
        }
        default:
            return state;
    }
}
