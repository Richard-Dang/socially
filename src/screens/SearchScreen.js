import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";

const SearchScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Search</Text>
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  tabBarIcon: <Icon name="search" type="feather" />
};

export default SearchScreen;

const styles = StyleSheet.create({});
