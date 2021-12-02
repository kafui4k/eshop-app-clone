import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View
      elevation={1}
      style={styles.listHeader}
    >
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text>Price</Text>
      </View>
    </View>
  )
}

const Products = (props) => {

  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(
    useCallback(
      () => {
        AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => {
          console.log(err);
        });

        axios
          .get(`${baseUrl}products`)
          .then((res) => {
            setProductList(res.data);
            setProductFilter(res.data);
            setLoading(false);
          })

          return () => {
            setProductList(null);
            setProductFilter(null);
            setLoading(true);
          };

      }, [],
    )
  )

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((item) => 
      item.name.toLowerCase().includes(text.toLowerCase())
    ));
  }

  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{  padding: 5 }}>
            <Icon name="search" />
            <Input 
              placeholder="Search"
              onChangeText={(text) => searchProduct(text) }
            />
          </Item>
        </Header>
      </View>
      { loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <ListItem 
              {...item}
              navigation={props.navigation}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#f2f2f2",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Products;