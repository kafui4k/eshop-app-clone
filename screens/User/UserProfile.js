import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import OrderCard from "../../Shared/OrderCard";

const UserProfile = (props) => {

    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState({});
    const [orders, setOrders] = useState();

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login");
            }

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseUrl}users/${context.stateUser.user.sub}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => {
                            setUserProfile(user.data);
                        }
                        );
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(`${baseUrl}orders`)
                .then((x) => {
                    const data = x.data;
                    const userOrders = data.filter((order) => (
                        order.user_id === context.stateUser.user.sub
                    ));
                    setOrders(userOrders);
                })
                .catch((error) => console.log(error));

                return () => {
                    setUserProfile();
                    setOrders();
                }
    }, [context.stateUser.isAuthenticated]));

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{  fontSize: 30 }}>
                    { userProfile ? userProfile.name : "" }
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{  margin: 10 }}>
                        Email: { userProfile ? userProfile.email : "" }
                    </Text>
                    <Text style={{  margin: 10 }}>
                        Phone: { userProfile ? userProfile.phone : "" }
                    </Text>
                </View>
                <View style={{  marginTop: 80 }}>
                    <Button title={"Sign out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]} />
                </View>
                <View style={styles.order}>
                    <Text style={{  fontSize: 20 }}>My Orders</Text>
                    <View>
                        { orders ? (
                            orders.map((x) => {
                                return <OrderCard key={x.id} {...x} />;
                        })
                        ) : (
                            <View style={styles.order}>
                                <Text>No orders available</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    subContainer: {
        marginTop: 60,
        alignItems: "center",
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
});

export default UserProfile;