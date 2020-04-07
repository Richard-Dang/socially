import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import sociallyApi from "../api/socially";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchUserListItem = ({ user }) => {
  const [friendAdded, setFriendAdded] = useState(false);

  return friendAdded ? null : (
    <ListItem
      rightElement={
        <TouchableOpacity
          onPress={async () => {
            try {
              await sociallyApi.post("/friends", { friendId: user._id });
              setFriendAdded(true);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Icon
            type="material"
            name="person-add"
            size={hp("4%")}
            iconStyle={styles.addUserIcon}
          />
        </TouchableOpacity>
      }
      title={user.name}
      subtitle={`(${user.username})`}
      leftAvatar={{
        source: {
          uri: getAvatarUrl(user.email),
        },
        size: hp("8%"),
        containerStyle: styles.listItemAvatar,
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
    fontSize: wp("6%"),
  },
  listItemSubtitle: {
    fontSize: wp("3.5%"),
    marginTop: hp("0.5%"),
  },
  listItemAvatar: {
    marginLeft: wp("6%"),
    marginRight: wp("5%"),
  },
  addUserIcon: {
    marginRight: wp("3%"),
  },
});
