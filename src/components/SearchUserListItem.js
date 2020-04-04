import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import sociallyApi from "../api/socially";

const SearchUserListItem = ({ user }) => {
  const [friendAdded, setFriendAdded] = useState(false);

  return friendAdded ? null : (
    <ListItem
      rightElement={
        <TouchableOpacity
          onPress={async () => {
            try {
              await sociallyApi.post("/addfriend", { friendId: user._id });
              setFriendAdded(true);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Icon
            type="material"
            name="person-add"
            size={40}
            iconStyle={styles.addUserIcon}
          />
        </TouchableOpacity>
      }
      title={user.name}
      subtitle={`(${user.username})`}
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
  },
  addUserIcon: {
    marginRight: 15
  }
});
