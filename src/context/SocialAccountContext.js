import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const socialAccountReducer = (state, action) => {
  switch (action.type) {
    case "fetch_social_accounts":
      return action.payload;
    case "clear_social_accounts":
      return [];
    case "update_social_accounts":
      return state.map(socialAccount =>
        socialAccount._id === action.payload._id
          ? action.payload
          : socialAccount
      );
    case "remove_social_account":
      return state.filter(
        socialAccount => socialAccount._id !== action.payload
      );
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
  dispatch({ type: "clear_social_accounts" });
};

const updateSocialAccountsLocally = dispatch => async socialAccount => {
  dispatch({ type: "update_social_accounts", payload: socialAccount });
};

const updateSocialAccounts = dispatch => async ({ socialAccounts }) => {
  try {
    const response = await sociallyApi.put("/socialaccounts", {
      socialAccounts
    });

    dispatch({ type: "fetch_social_accounts", payload: response.data });
  } catch (err) {
    console.log(err.response.data);
  }
};

const removeSocialAccount = dispatch => async ({ accountId }) => {
  console.log(accountId);
  try {
    await sociallyApi.delete("/socialaccounts", {
      data: {
        accountId
      }
    });
    dispatch({ type: "remove_social_account", payload: accountId });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const { Provider, Context } = createDataContext(
  socialAccountReducer,
  {
    fetchSocialAccounts,
    clearSocialAccounts,
    updateSocialAccountsLocally,
    updateSocialAccounts,
    removeSocialAccount
  },
  []
);
