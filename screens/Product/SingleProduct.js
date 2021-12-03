import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState('');

    useEffect(() => {
        if(props.route.params.item.countInStock == 0){
            setAvailability(<TrafficLight unvailable></TrafficLight>);
            setAvailabilityText('Out of stock');
        } else if(props.route.params.item.countInStock <= 5){
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText('Limited stock');
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText('In stock');
        }

        return () => {
            setAvailability(null);
            setAvailabilityText('');
        }
    }, []);

    const addToCart = () => {
        props.navigation.navigate('Cart', {item: item});
        Toast.show({
            text1: 'Added to cart',
            text2: '',
            type: 'success',
        }), []
    };

    return (
        <Container style={ styles.container }>
            <ScrollView style={{ marginBottom: 80, padding: 5 }} >
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image
                            : "https://cdn.pixabay.com/photo/2021/08/20/18/00/shaving-6560988_960_720.jpg"
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>
                        {item.name}
                    </H1>
                    <Text style={styles.contentText}>
                        {item.brand}
                    </Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                        <Text>{item.description}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right>
                    <EasyButton
                        primary
                        medium
                        onPress={() => {props.addItemToCart(item),
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: `${item.name} added to Cart`,
                            text2: "Got to Cart to Complete Order"
                        });
                    }}
                    >
                        <Text style={{ color: "white" }}></Text>
                    </EasyButton>
                </Right>
            </View>
        </Container>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%"
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
    },
    price: {
        fontSize: 20,
        margin: 20,
        color: "red",
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    availability: {
        flexDirection: "row",
        marginBottom: 10,
    },
});

export default SingleProduct;