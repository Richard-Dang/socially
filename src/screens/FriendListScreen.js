import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native";

const FriendListScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Friends</Text>
    </SafeAreaView>
  );
};

FriendListScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default FriendListScreen;

const styles = StyleSheet.create({});
