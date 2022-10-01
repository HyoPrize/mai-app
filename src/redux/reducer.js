import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";
import addUserSignReducer from "./reducers/UserSignReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
    menuSelect: addMenuSelectReducer,
    searchText: addMenuSearchTextReducer,
    userToggle: addUserToggleReducer,
    userSign: addUserSignReducer,
});

export default rootReducer;
