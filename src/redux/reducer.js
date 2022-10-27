import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";
import addUserPageStateReducer from "./reducers/UserPageStateReducer";
import addUserReducer from "./reducers/UserReducer";
import addFavoriteReducer from "./reducers/FavoriteReducer";
import addHistoryReducer from "./reducers/HistoryReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
    menuSelect: addMenuSelectReducer,
    searchText: addMenuSearchTextReducer,
    userToggle: addUserToggleReducer,
    userPageState: addUserPageStateReducer,
    user: addUserReducer,
    favorite: addFavoriteReducer,
    history: addHistoryReducer,
});

export default rootReducer;
