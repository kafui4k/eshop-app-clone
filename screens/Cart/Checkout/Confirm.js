import React from "react";
import { ScrollView, View, Button } from "react-native";
import {
  Text,
  Left,
  Right,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseUrl from "../../../assets/common/baseUrl";


var { height, width } = Dimensions.get("window");

const Confirm = (props) => {

  const finalOrder = props.route.params;

  const confirmOrder = () => {

    const order = finalOrder.order.order;

    axios
      .post(`${baseUrl}orders`, order)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            type: "success",
            topOffset: 60,
            text1: "Order Placed Successfully",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500)

        }

      })
      .catch((err) => {
        Toast.show({
          type: "error",
          topOffset: 60,
          text1: "Order Failed",
          text2: "",
        })
      })
    }
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 5000);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Confirm Order
          </Text>
          {props.route.params ? 
            <View style={{ borderWidth: 1, borderColor: 'orange' }}>
              <Text style={styles.title}>
                Shipping to:
              </Text>
              <View>
                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                <Text>City: {finalOrder.order.order.city}</Text>
                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                <Text>Country: {finalOrder.order.order.country}</Text>
              </View>
              <Text style={styles.title}>Items:</Text>
              {finalOrder.order.order.items.map((x) => {
                return (
                  <ListItem
                    key={x.product.name}
                    style={styles.listItem}
                    avatar
                  >
                    <Left>
                      <Thumbnail source={{ uri: x.product.image }} />
                      </Left>
                      <Body style={styles.body}>
                        <Left>
                          <Text>{x.product.name}</Text>
                        </Left>
                        <Right>
                          <Text>{x.product.price}</Text>
                        </Right>
                      </Body>
                    </ListItem>
                )
              })}
            </View>
            : null }
            <View style={{ alignItems: 'center', margin: 20 }}>
              <Button title={'Place Order'} onPress={confirmOrder}/>
            </View>
      </View>
    </ScrollView>
  );

}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(null, mapDispatchToProps)(Confirm);