import { AsyncStorage } from "react-native";
import sociallyApi from "../api/socially";
import { navigate } from "../navigation/navigationRef";
import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.currentUser
      };
    case "logout":
      return { token: null, currentUser: null };
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

export const { Provider, Context } = createDataContext(
  authReducer,
  { register, login, tryLocalLogin, logout },
  { token: null, currentUser: null }
);
