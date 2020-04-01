import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
};

SearchScreen.navigationOptions = {
  tabBarIcon: <Feather name="search" size={30} />
};

export default SearchScreen;

const styles = StyleSheet.create({});
