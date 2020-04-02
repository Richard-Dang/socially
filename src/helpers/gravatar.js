import { GravatarApi } from "react-native-gravatar";

export const getAvatarUrl = email => {
  return GravatarApi.imageUrl({
    email: email, //TODO: hardcoded
    parameters: { size: "200", d: "mm" },
    secure: true
  });
};