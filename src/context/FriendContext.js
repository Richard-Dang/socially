import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const friendReducer = (state, action) => {
  switch (action.type) {
    case "fetch_friends":
      return action.payload;
    default:
      return state;
  }
};

const fetchFriends = dispatch => async () => {
  try {
    const response = await sociallyApi.get("/friends");
    dispatch({ type: "fetch_friends", payload: response.data });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const { Provider, Context } = createDataContext(
  friendReducer,
  { fetchFriends },
  []
);
