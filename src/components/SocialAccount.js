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
      raised
      style={styles.socialButton}
      onPress={openUrl(accountType, username)}
      fontStyle={styles.buttonFont}
      iconSize={35}
      iconStyle={styles.buttonIcon}
    />
  );
};

export default SocialAccount;

const styles = StyleSheet.create({
  socialButton: {
    width: 300,
    height: 60
  },
  buttonFont: {
    fontSize: 20
  },
  buttonIcon: {
    marginRight: 20
  },

});
