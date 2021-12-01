import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// STacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            initialRouterName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        >
            <Tab.Screen
                name="Homepage"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color}) => (
                        <Icon
                            name="home"
                            color={color}
                            size={30}
                        />
                    )
                }}
                
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Admin"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="cog"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="user"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;