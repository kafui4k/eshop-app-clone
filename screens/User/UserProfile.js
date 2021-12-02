import React, { useContext, useState, useCallback } from "reactt";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {

    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
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
    }, [context.stateUser.isAuthenticated]);

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
    }
});

export default UserProfile;