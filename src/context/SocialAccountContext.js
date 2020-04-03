import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const socialAccountReducer = (state, action) => {
  switch (action.type) {
    case "fetch_social_accounts":
      return action.payload;
    case "clear_social_accounts":
      console.log("dispatch");
      return [];
    default:
      return state;
  }
};

const fetchSocialAccounts = dispatch => async ({ userId }) => {
  try {
    const response = await sociallyApi.post("/socialaccounts", { userId });
    dispatch({ type: "fetch_social_accounts", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

const clearSocialAccounts = dispatch => () => {
  console.log("Blur");
  dispatch({ type: "clear_social_accounts" });
};

export const { Provider, Context } = createDataContext(
  socialAccountReducer,
  { fetchSocialAccounts, clearSocialAccounts },
  []
);
