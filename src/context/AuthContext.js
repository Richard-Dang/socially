import { AsyncStorage } from "react-native";
import sociallyApi from "../api/socially";
import { navigate } from "../navigation/navigationRef";
import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        errorMessage: "",
      };
    case "logout":
      return { ...state, token: null, errorMessage: "" };
    case "update_user":
      return { ...state, currentUser: action.payload.currentUser };
    case "add_error_message":
      return { ...state, errorMessage: action.payload.errorMessage };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const addErrorMessage = (dispatch) => async ({ errorMessage }) => {
  dispatch({ type: "add_error_message", payload: { errorMessage } });
};

const clearErrorMessage = (dispatch) => async () => {
  dispatch({ type: "clear_error_message" });
};

const tryLocalLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    const response = await sociallyApi.get("/user");
    dispatch({ type: "login", payload: { token, currentUser: response.data } });
    navigate("FriendList");
  } else {
    navigate("loginFlow");
  }
};

const register = (dispatch) => async ({ email, username, name, password }) => {
  try {
    const response = await sociallyApi.post("/register", {
      email,
      username,
      name,
      password,
    });
    const { token, currentUser } = response.data;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: { token, currentUser } });
    navigate("FriendList");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "add_error_message",
      payload: { errorMessage: "Something went wrong with registering." },
    });
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const response = await sociallyApi.post("/login", {
      email,
      password,
    });
    const { token, currentUser } = response.data;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: { token, currentUser } });
    navigate("FriendList");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "add_error_message",
      payload: { errorMessage: "Something went wrong with login." },
    });
  }
};

const logout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "logout" });
  navigate("loginFlow");
};

// TODO: Probably want to refactor this method into a different context
const updateUser = (dispatch) => async ({ name, bio }) => {
  try {
    const response = await sociallyApi.put("/user", { name, bio });

    dispatch({ type: "update_user", payload: { currentUser: response.data } });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    register,
    login,
    tryLocalLogin,
    logout,
    updateUser,
    clearErrorMessage,
    addErrorMessage,
  },
  { token: null, currentUser: null, errorMessage: "" }
);
