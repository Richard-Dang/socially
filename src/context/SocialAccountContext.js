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

const fetchSocialAccounts = dispatch => async () => {
  try {
    const response = await sociallyApi.get("/socialaccounts");
    dispatch({ type: "fetch_social_accounts", payload: response.data });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const { Provider, Context } = createDataContext(
  socialAccountReducer,
  { fetchSocialAccounts },
  []
);
