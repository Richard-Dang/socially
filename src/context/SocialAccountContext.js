import createDataContext from "./createDataContext";
import sociallyApi from "../api/socially";

const socialAccountReducer = (state, action) => {
  let newSocialAccounts = null;
  let newUnusedAccountTypes = null;

  switch (action.type) {
    case "fetch_social_accounts":
      return {
        socialAccounts: action.payload.socialAccounts,
        unusedAccountTypes: action.payload.unusedAccountTypes,
      };
    case "update_social_accounts":
      return {
        ...state,
        socialAccounts: action.payload,
      };
    case "edit_social_accounts":
      newSocialAccounts = state.socialAccounts.map((socialAccount) =>
        socialAccount._id === action.payload._id
          ? action.payload
          : socialAccount
      );

      return { ...state, socialAccounts: newSocialAccounts };
    case "remove_social_account":
      newSocialAccounts = state.socialAccounts.filter(
        (socialAccount) => socialAccount._id !== action.payload._id
      );

      return {
        socialAccounts: newSocialAccounts,
        unusedAccountTypes: [
          ...state.unusedAccountTypes,
          action.payload.accountType,
        ],
      };

    case "add_social_account":
      newUnusedAccountTypes = state.unusedAccountTypes.filter(
        (unusedAccountType) => unusedAccountType !== action.payload.accountType
      );

      return {
        socialAccounts: [...state.socialAccounts, action.payload],
        unusedAccountTypes: newUnusedAccountTypes,
      };
    // case "clear_social_accounts":
    //   return { socialAccounts: [] };
    default:
      return state;
  }
};

const fetchSocialAccounts = (dispatch) => async ({ userId }) => {
  try {
    const response = await sociallyApi.get("/socialaccounts", {
      params: { userId },
    });
    const { socialAccounts, unusedAccountTypes } = response.data;
    dispatch({
      type: "fetch_social_accounts",
      payload: { socialAccounts, unusedAccountTypes },
    });
  } catch (err) {
    console.log(err);
  }
};

const editSocialAccount = (dispatch) => async ({ socialAccount }) => {
  dispatch({ type: "edit_social_account", payload: socialAccount });
};

const removeSocialAccount = (dispatch) => async ({ socialAccount }) => {
  dispatch({ type: "remove_social_account", payload: socialAccount });
};

const addSocialAccount = (dispatch) => async ({ accountType, userId }) => {
  const socialAccount = {
    accountType,
    userId,
    username: "",
  };

  dispatch({ type: "add_social_account", payload: socialAccount });
};

const updateSocialAccounts = (dispatch) => async ({ socialAccounts }) => {
  const nonEmptySocialAccounts = socialAccounts.filter((socialAccount) => {
    removeSocialAccount({ socialAccount });
    return socialAccount.username;
  });

  try {
    const response = await sociallyApi.put("/socialaccounts", {
      socialAccounts: nonEmptySocialAccounts,
    });

    dispatch({
      type: "update_social_accounts",
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

// const clearSocialAccounts = (dispatch) => () => {
//   dispatch({ type: "clear_social_accounts" });
// };

export const { Provider, Context } = createDataContext(
  socialAccountReducer,
  {
    // clearSocialAccounts,
    fetchSocialAccounts,
    editSocialAccount,
    updateSocialAccounts,
    removeSocialAccount,
    addSocialAccount,
  },
  { socialAccounts: [], unusedAccountTypes: [] }
);
