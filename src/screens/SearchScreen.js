import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import { Input, Text, Icon } from "react-native-elements";

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
