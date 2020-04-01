import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SplashScreen from "./src/screens/SplashScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import FriendListScreen from "./src/screens/FriendListScreen";
import FriendDetailScreen from "./src/screens/FriendDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import { ThemeProvider } from "react-native-elements";
import theme from "./src/styles/Theme";
import { setNavigator } from "./src/navigation/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Feather } from "@expo/vector-icons";

const friendListFlow = createStackNavigator({
  FriendList: FriendListScreen,
  FriendDetail: FriendDetailScreen
});

friendListFlow.navigationOptions = {
  tabBarIcon: <Feather name="home" size={30} />
};

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Splash: SplashScreen,
      Register: RegisterScreen,
      Login: LoginScreen
    }),
    mainFlow: createBottomTabNavigator(
      {
        Search: SearchScreen,
        friendListFlow: friendListFlow,
        EditProfile: EditProfileScreen
      },
      { tabBarOptions: { showLabel: false } }
    )
  },
  { initialRouteName: "ResolveAuth" }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};
