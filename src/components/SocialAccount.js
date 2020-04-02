import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import { SocialIcon } from "react-native-elements";

const SocialAccount = ({ accountType, username }) => {
  return (
    <SocialIcon
      title={username}
      button
      type={accountType}
      raised={false}
      style={{ width: 200 }}
      // TODO: Enable deep linking
      // onPress={Linking.openURL(`instagram://user?username=${username}`)}
    />
  );
};

export default SocialAccount;

const styles = StyleSheet.create({});
