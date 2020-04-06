import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";

const openUrl = (accountType, username) => async () => {
  const accountTypeDict = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/in/",
    twitter: "https://twitter.com/",
    twitch: "https://www.twitch.tv",
    steam: "https://steamcommunity.com/id/",
    soundcloud: "https://soundcloud.com/",
    github: "https://github.com/",
    flickr: "https://www.flickr.com/photos/",
  };

  const link = accountTypeDict[accountType] + username;

  return link ? Linking.openURL(link) : null;
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
    height: 60,
  },
  buttonFont: {
    fontSize: 20,
  },
  buttonIcon: {
    marginRight: 20,
  },
});
