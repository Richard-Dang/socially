import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigation/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "register":
      return { ...state, token: action.payload };
    default:
      return state;
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
    dispatch({ type: "register", payload: token });
    navigate("FriendList");
  } catch (err) {
    console.log(err.response.data);
  }
};

const login = dispatch => () => {};

export const { Provider, Context } = createDataContext(
  authReducer,
  { register },
  { token: null }
);
