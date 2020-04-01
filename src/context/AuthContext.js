import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigation/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const tryLocalLogin = dispatch => () => {
  const token = AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "login", payload: token });
    navigate("FriendList");
  } else {
    navigate("SplashScreen");
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

export const { Provider, Context } = createDataContext(
  authReducer,
  { register, login, tryLocalLogin },
  { token: null }
);
