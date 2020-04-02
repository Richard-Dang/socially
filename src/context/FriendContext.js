import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const friendReducer = (state, action) => {
  switch (action.type) {
    case "fetch_friends":
      return action.payload;
    // case "fetch_current_user":
    //   return { ...state, currentUser: action.payload };
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

// const fetchCurrentUser = dispatch => async () => {
//   try {
//     const response = await sociallyApi.get("/user");
//     // console.log(response.data);
//     dispatch({ type: "fetch_current_user", payload: response.data });
//   } catch (err) {
//     console.log(err.reponse.data);
//   }
// };

export const { Provider, Context } = createDataContext(
  friendReducer,
  { fetchFriends },
  []
);
