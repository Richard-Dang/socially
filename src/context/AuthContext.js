import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigation/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, token: action.payload };
    case "logout":
      return { token: null };
    default:
      return state;
  }
};

const tryLocalLogin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "login", payload: token });
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
    const token = response.data.token;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: token });
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
    const token = response.data.token;

    await AsyncStorage.setItem("token", token);
    dispatch({ type: "login", payload: token });
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

export const { Provider, Context } = createDataContext(
  authReducer,
  { register, login, tryLocalLogin, logout },
  { token: null }
);
