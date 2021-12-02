import React, { useCallback, useState } from "react"
import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Container, Header, Text, Icon, Input, Item } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import baseUrl from "../../assets/common/baseUrl";
import axios from 'axios';

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect((

        useCallback(

            () => {
                setFocus(false);
                setActive(-1);

                // get Products
                axios
                    .get(`${baseUrl}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // get Categories
                axios
                    .get(`${baseUrl}categories`)
                    .then((res) => {
                        setCategories(res.data);
                    })
                    .catch((error) => {
                        console.log('API Call Error');
                    });

                return () => {
                    setProducts([])
                    setProductsFiltered([])
                    setFocus()
                    setCategories([]);
                    setProductsCtg([]);
                    setActive();
                    setInitialState();
                }
            },
            [],
            )
        ))

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    // categories
    const changeCtg = (ctg) => {
        {
            ctg === 'all' ? [setProductsCtg(initialState), setActive(true)]
            : [
                setProductsCtg(
                    products.filter((i) => i.category._id === ctg),
                    setActive(true)
                ),
            ];
        }
    }

    return (
        <>
        {loading == false ? (
            <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search"/>
                    <Input
                        placeholder="search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? (
                        <Icon onPress={onBlur} name="ios-close" />
                    ) : null }
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    navigation={props.navigation}
                    productsFiltered={productsFiltered}
                />
            ) : (
                <ScrollView>
                    <View>
                        <View>
                            <Banner />
                        </View>
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </View>
                        {productsCtg.length > 0 ? (
                            <View style={ styles.listContainer}>
                            { productsCtg.map((item) => {
                                return (
                                    <ProductList
                                        navigation={props.navigation}
                                        key={item._id}
                                        item={item}
                                    />
                                )
                            })}
                        </View>
                        ) : (
                            <View style={[styles.center, { height: '40%' }]}>
                                <Text>No products found</Text>
                            </View>
                        )}
                        
                    </View>
                </ScrollView>
                
            )}       
        </Container>
        ) : (
            // loading
            <Container style={[styles.center, {backgroundColor: "#f2f2f2"}]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Container>
        )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro"
    },
    listContainer: {
        width: '100%',
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro"
    }
});

export default ProductContainer;