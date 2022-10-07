import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";
import addUserPageStateReducer from "./reducers/UserPageStateReducer";
import addUserReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
    menuSelect: addMenuSelectReducer,
    searchText: addMenuSearchTextReducer,
    userToggle: addUserToggleReducer,
    userPageState: addUserPageStateReducer,
    userInfo: addUserReducer,
});

export default rootReducer;
