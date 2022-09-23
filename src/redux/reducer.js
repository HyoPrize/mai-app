import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
    userToggle: addUserToggleReducer,
    menuSelect: addMenuSelectReducer,
});

export default rootReducer;
