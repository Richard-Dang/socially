import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const socialAccountReducer = (state, action) => {
  switch (action.type) {
    case "fetch_social_accounts":
      return action.payload;
    default:
      return state;
  }
};

const fetchSocialAccounts = dispatch => async ({ userId }) => {
  try {
    console.log({ userId });
    const response = await sociallyApi.post("/socialaccounts", { userId });
    console.log(response.data);
    dispatch({ type: "fetch_social_accounts", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  socialAccountReducer,
  { fetchSocialAccounts },
  []
);
