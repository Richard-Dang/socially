import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const openUrl = (accountType, username) => async () => {
  const accountTypeDict = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/in/",
    twitter: "https://twitter.com/",
    twitch: "https://www.twitch.tv/",
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
      iconSize={hp("3%")}
      iconStyle={styles.buttonIcon}
    />
  );
};

export default SocialAccount;

const styles = StyleSheet.create({
  socialButton: {
    width: wp("70%"),
    height: hp("7%"),
  },
  buttonFont: {
    fontSize: wp("4%"),
  },
  buttonIcon: {
    marginRight: wp("4%"),
  },
});
