import { AsyncStorage } from "react-native";
import sociallyApi from "../api/socially";
import { navigate } from "../navigation/navigationRef";
import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        token: action.payload.token,
        currentUser: action.payload.currentUser
      };
    case "logout":
      return { ...state, token: null };
    case "update_user":
      return { ...state, currentUser: action.payload.currentUser };
    default:
      return state;
  }
};

const tryLocalLogin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    const response = await sociallyApi.get("/user");
    dispatch({ type: "login", payload: { token, currentUser: response.data } });
    navigate("FriendList");
  } else {
    navigate("loginFlow");
  }
};

const register = dispatch => async ({ email, username, name, password }) => {
  try {
    const response = await sociallyApi.post("/register", {
      email,
      username,
      name,
      password
    });
    const { token, currentUser } = response.data;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: { token, currentUser } });
    navigate("FriendList");
  } catch (err) {
    console.log(err.response.data);
  }
};

const login = dispatch => async ({ email, password }) => {
  try {
    const response = await sociallyApi.post("/login", {
      email,
      password
    });
    const { token, currentUser } = response.data;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: { token, currentUser } });
    navigate("FriendList");
  } catch (err) {
    console.log(err.response.data);
  }
};

const logout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "logout" });
  navigate("loginFlow");
};

// TODO: Probably want to refactor this method into a different context
const updateUser = dispatch => async ({name, bio}) => {
  try {
    const response = await sociallyApi.put("/user", { name, bio });

    dispatch({ type: "update_user", payload: { currentUser: response.data } });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { register, login, tryLocalLogin, logout, updateUser },
  { token: null, currentUser: null }
);
