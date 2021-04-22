
import user from "./authReducers";
import orgs from "./orgReducer";
import courses from "./courseReducer";
import users from "./userReducer";
import requests from "./requestReducer";
import categories from "./categoryReducer";
import chapters from "./chapterReducer";
import loading from "./loadingReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    user,
    orgs,
    loading,
    requests,
    courses,
    users,
    categories,
    chapters,
})

export default rootReducer