import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import EasyButton from './StyledComponents/EasyButton';
import Toast from "react-native-toast-message";

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import baseUrl from '../assets/common/baseUrl';

const codes = [
    { name: "pending", code: "3" },
    { name: "shipped", code: "2" },
    { name: "delivered", code: "1" }
];

const OrderCard = (props) => {

    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();

    useEffect(() => {

        if (props.editMode) {
            AsyncStorage.getItem('jwt')
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
        }

        if (props.status == "3") {
            setOrderStatus(<TrafficLight unvailable></TrafficLight>);
            setStatusText("pending");
            setCardColor("#FFC107");
        } else if (props.status == "2") {
            setOrderStatus(<TrafficLight limited></TrafficLight>);
            setStatusText("shipped");
            setCardColor("#4CAF50");
        } else {
            setOrderStatus(<TrafficLight available></TrafficLight>);
            setStatusText("delivered");
            setCardColor("#4CAF50");
        }

        return () => {
            setOrderStatus();
            setStatusText();
            setCardColor();
        }
    }, [])

    const updateOrder = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const order = {
            city: props.city,
            country: props.country,
            dateOrdered: props.dateOrdered,
            id: props.id,
            orderItems: props.orderItems,
            phone: props.phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.totalPrice,
            user: props.user,
            zip: props.zip
        }

        axios
            .put(`${baseUrl}orders/${props.id}`, order, config)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    Toast.show({
                      type: "success",
                      topOffset: 60,
                      text1: "Order Edited Successfully",
                      text2: "",
                    });
                    setTimeout(() => {
                      props.clearCart();
                      props.navigation.navigate("Cart");
                    }, 500)
          
                  }
            })
            .catch((error) => {
                Toast.show({
                  type: "error",
                  topOffset: 60,
                  text1: "Error Editing Order",
                  text2: "Please try Again",
                });
            })
    }

    return (
        <View style={[{backgroundColor: cardColor}, styles.container]}>
            <View style={styles.title}>
                <Text>Order Number: #{props.id}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>
                    Status: {statusText} {orderStatus}
                </Text>
                <Text>
                    Address: {props.shippingAddress1} {props.shippingAddress2}
                </Text>
                <Text>
                    City: {props.shippingCity}
                </Text>
                <Text>
                    Country: {props.shippingCountry}
                </Text>
                <Text>
                    Date Ordered: {props.dateOrdered.split("T")[0]}
                </Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>$ {props.totalPrice}</Text>
                </View>
                { props.editMode ? (
                     <View>
                     <Picker
                         mode="dropdown"
                         iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                         style={{ width: undefined }}
                         selectedValue={statusChange}
                         placeholder="Cahnege Status"
                         placeholderIconColor="#007aff"
                         onValueChange={(e) => setStatusChange(e)}
                     >
                         { codes.map((code) => {
                             return (
                                 <Picker.Item key={code.name} label={code.name} value={code.code} />
                             )
                         })}
                         
                     </Picker>
                     <EasyButton
                        secondary
                        large
                        onPress={() => updateOrder()}
                    >
                        <Text style={{ color: "white" }}>Updated</Text>
                    </EasyButton>
                 </View>
                )
                : null }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,

    },
    title: {
        backgroundColor: "ash",
        padding: 5,

    },
    priceContainer: {
        marginTop: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    price: {
        color: "white",
        fontWeight: "bold",
    }
});

export default OrderCard;