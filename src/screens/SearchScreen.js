import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon, Text, SearchBar } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import useResults from "../hooks/useResults";
import { FlatList } from "react-native-gesture-handler";
import SearchUserListItem from "../components/SearchUserListItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchScreen = ({ isFocused }) => {
  const [term, setTerm] = useState("");
  const [searchUsers, results] = useResults(isFocused);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Text h2>Search</Text>
      <SearchBar
        placeholder="Find Friends"
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        lightTheme
        onChangeText={(term) => {
          setTerm(term);
          searchUsers(term);
        }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item: user }) => <SearchUserListItem user={user} />}
      />
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  tabBarIcon: <Icon name="search" type="feather" />,
};

export default withNavigationFocus(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 5,
  },
  searchBarContainer: {
    backgroundColor: "white",
  },
  searchBarInput: {
    borderWidth: hp("0.5%"),
    borderBottomWidth: hp("0.5%"),
    borderColor: "black",
    backgroundColor: "white",
  },
});
