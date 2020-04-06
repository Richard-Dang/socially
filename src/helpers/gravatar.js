import { GravatarApi } from "react-native-gravatar";

export const getAvatarUrl = email => {
  return GravatarApi.imageUrl({
    email: email, 
    parameters: { size: "200", d: "robohash" },
    secure: true
  });
};
