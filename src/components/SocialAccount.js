import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";

const openUrl = (accountType, username) => async () => {
  switch (accountType) {
    case "facebook":
      return await Linking.openURL(`https://www.facebook.com/${username}`);
    case "instagram":
      return await Linking.openURL(`https://www.instagram.com/${username}`);
    case "linkedin":
      return await Linking.openURL(`https://www.linkedin.com/in/${username}`);
    default:
      return null;
  }
};

const SocialAccount = ({ accountType, username }) => {
  return (
    <SocialIcon
      title={username}
      button
      type={accountType}
      raised={false}
      style={{ width: 200 }}
      onPress={openUrl(accountType, username)}
    />
  );
};

export default SocialAccount;

const styles = StyleSheet.create({});
