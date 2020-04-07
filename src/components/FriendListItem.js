import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import { withNavigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FriendListItem = ({ friend, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FriendDetail", { _id: friend._id });
      }}
    >
      <ListItem
        chevron={{ size: wp("8%"), color: "black" }}
        title={friend.name}
        subtitle={friend.bio ? friend.bio : null}
        leftAvatar={{
          source: {
            uri: getAvatarUrl(friend.email),
          },
          size: hp("8%"),
          containerStyle: styles.listItemAvatar,
        }}
        bottomDivider
        topDivider
        titleStyle={styles.listItemTitle}
        subtitleStyle={styles.listItemSubtitle}
      />
    </TouchableOpacity>
  );
};

export default withNavigation(FriendListItem);

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
});
