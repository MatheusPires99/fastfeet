import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

import SignIn from "./pages/SignIn";

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
      }),
      //   App: createBottomTabNavigator(
      //     {
      //       Dashboard,
      //       New: {
      //         screen: createStackNavigator(
      //           {
      //             SelectProvider,
      //             SelectDateTime,
      //             Confirm,
      //           },
      //           {
      //             defaultNavigationOptions: {
      //               headerTransparent: true,
      //               headerTintColor: "#fff",
      //               headerLeftContainerStyle: { marginLeft: 20 },
      //             },
      //           }
      //         ),
      //         navigationOptions: {
      //           tabBarVisible: false,
      //           tabBarLabel: "Agendar",
      //           tabBarIcon: (
      //             <Icon
      //               name="add-circle-outline"
      //               size={20}
      //               color="rgba(255, 255, 255, 0.6)"
      //             />
      //           ),
      //         },
      //       },
      //       Profile,
      //     },
      //     {
      //       tabBarOptions: {
      //         keyboardHidesTabBar: true,
      //         activeTintColor: "#FFF",
      //         inactiveTintColor: "rgba(255, 255, 255, 0.6)",
      //         style: {
      //           backgroundColor: "#8d48a8",
      //         },
      //       },
      //     }
      //   ),
      // },
      // {
      //   initialRouteName: signedIn ? "App" : "Sign",
      // }
    })
  );
