import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import { withNavigation } from "react-navigation";

const FriendListItem = ({ friend, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FriendDetail", { _id: friend._id });
      }}
    >
      <ListItem
        chevron={{ size: 25, color: "black"}}
        title={friend.name}
        subtitle={friend.bio ? friend.bio : null}
        leftAvatar={{
          source: {
            uri: getAvatarUrl(friend.email)
          },
          size: 70,
          containerStyle: styles.listItemAvatar
        }}
        bottomDivider
        titleStyle={styles.listItemTitle}
        subtitleStyle={styles.listItemSubtitle}
      />
    </TouchableOpacity>
  );
};

export default withNavigation(FriendListItem);

const styles = StyleSheet.create({
  listItemTitle: {
    fontSize: 25
  },
  listItemSubtitle: {
    marginTop: -10
  },
  listItemAvatar: {
    marginLeft: 20
  }
});
