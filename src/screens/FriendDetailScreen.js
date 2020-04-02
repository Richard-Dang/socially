import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as FriendContext } from "../context/FriendContext";
import { Avatar, Text, Icon } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import { SafeAreaView } from "react-navigation";
import GlobalStyles from "../styles/GlobalStyles";

const FriendDetailScreen = ({ navigation }) => {
  const {
    state: { friends, currentUser }
  } = useContext(FriendContext);
  const _id = navigation.getParam("_id");

  const user =
    _id === currentUser._id ? currentUser : friends.find(f => f._id === _id);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Icon
        containerStyle={GlobalStyles.backButton}
        name="back"
        type="antdesign"
        onPress={() => navigation.navigate("FriendList")}
      />
      <View style={styles.container}>
        <Avatar
          rounded
          size={200}
          source={{ uri: getAvatarUrl(user.email) }}
          containerStyle={styles.profileImage}
        />
        <Text h2 style={styles.name}>
          {user.name}
        </Text>
        <Text h4>{user.bio}</Text>
      </View>
    </SafeAreaView>
  );
};

FriendDetailScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  profileImage: {
    marginTop: 90
  },
  name: {}
});
