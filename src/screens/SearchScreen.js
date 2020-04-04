import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon, Text, SearchBar } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import useResults from "../hooks/useResults";
import { FlatList } from "react-native-gesture-handler";
import SearchUserListItem from "../components/SearchUserListItem";

const SearchScreen = ({ isFocused }) => {
  const [term, setTerm] = useState("");
  const [searchUsers, results] = useResults(isFocused);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Search</Text>
      <SearchBar
        placeholder="Find Friends"
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        lightTheme
        onChangeText={term => {
          setTerm(term);
          searchUsers(term);
        }}
      />
      <FlatList
        data={results}
        keyExtractor={item => item._id}
        renderItem={({ item: user }) => <SearchUserListItem user={user} />}
      />
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  tabBarIcon: <Icon name="search" type="feather" />
};

export default withNavigationFocus(SearchScreen);

const styles = StyleSheet.create({});
