import React from "react";
import { StatusBar } from "react-native";
import { Icon, ThemeProvider } from "react-native-elements";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigation/navigationRef";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import FriendDetailScreen from "./src/screens/FriendDetailScreen";
import FriendListScreen from "./src/screens/FriendListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SplashScreen from "./src/screens/SplashScreen";
import theme from "./src/styles/Theme";
import { Provider as FriendProvider } from "./src/context/FriendContext";

const friendListFlow = createStackNavigator({
  FriendList: FriendListScreen,
  FriendDetail: FriendDetailScreen
});

friendListFlow.navigationOptions = {
  tabBarIcon: <Icon name="home" type="feather" />
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
      <FriendProvider>
        <AuthProvider>
          <StatusBar barStyle="dark-content" />
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </FriendProvider>
    </ThemeProvider>
  );
};
