import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import Toast from "react-native-toast-message";

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');

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
                { /* TODO: Description, Rich Description and Avaialbility */}
            </ScrollView>

            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right>
                    <Button title="Add" onPress={() => {props.addItemToCart(item),
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: `${item.name} added to Cart`,
                            text2: "Got to Cart to Complete Order"
                        });
                    }} />
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
        alignItems: "center"
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white"
    },
    price: {
        fontSize: 20,
        margin: 20,
        color: 'red'
    }
})

export default SingleProduct;