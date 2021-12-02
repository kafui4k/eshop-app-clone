import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // register method
    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill all the fields");
        }
        // } else {
        //     setError("");
        //     props.navigation.navigate("Home");
        // }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }

        axios
            .post(`${baseUrl}users/register`, user)
            .then(res => {
                if (res.status === 200) {
                    Toast.show({
                        type: "success",
                        topOffset: 60,
                        text1: "Success Registration",
                        text2: "You can login now",
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 5000);
                }
            })
            .catch(error => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            });
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enabledOnAndroid={true}
        >
            <FormContainer title={'Register'}>
                <Input
                    placeholder={'Email'}
                    name={'email'}
                    id={'email'}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />

                <Input
                    placeholder={'Name'}
                    name={'name'}
                    id={'name'}
                    onChangeText={(text) => setName(text.toLowerCase())}
                />

                <Input
                    placeholder={'Phone Number'}
                    name={'phone'}
                    id={'phone'}
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => setPhone(text)}
                />

                <Input
                    placeholder={'Password'}
                    name={'password'}
                    id={'password'}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.buttonGroup}>
                    { error ? <Error message={error} /> : null }
                </View>
                <View>
                    <Button title={'Register'} onPress={() => register()} />
                </View>
                <View>
                    <Button title={'Back to Login'} 
                        onPress={() => props.navigation.navigate('Login')} 
                    />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    }
});

export default Register;