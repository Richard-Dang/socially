import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";

const SearchUserListItem = ({ user }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        //Make backend call to add user and remove from search list
      }}
    >
      <ListItem
        rightElement={<Icon type="material" name="person-add"/>}
        title={`${user.name}    (${user.username})`}
        leftAvatar={{
          source: {
            uri: getAvatarUrl(user.email)
          },
          size: 70,
          containerStyle: styles.listItemAvatar
        }}
        bottomDivider
        topDivider
        titleStyle={styles.listItemTitle}
        subtitleStyle={styles.listItemSubtitle}
      />
    </TouchableOpacity>
  );
};

export default SearchUserListItem;

const styles = StyleSheet.create({
  listItemTitle: {
    fontSize: 25
  },
  listItemSubtitle: {
    marginTop: 5
  },
  listItemAvatar: {
    marginLeft: 20,
    marginRight: 15
  }
});
