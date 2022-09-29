import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
    userToggle: addUserToggleReducer,
    menuSelect: addMenuSelectReducer,
    searchText: addMenuSearchTextReducer,
});

export default rootReducer;
