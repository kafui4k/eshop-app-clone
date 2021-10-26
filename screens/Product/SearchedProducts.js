import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';
import { Content, Left, Body,ListItem, Thumbnail, Text } from 'native-base';

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {

    const { productsFiltered } = props;

    return (
        <Content style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem 
                        // onPress={navigation}
                        key={item._id}
                        avatar
                    >
                        <Left>
                            <Thumbnail
                                source={{uri: item.image ?
                                item.image : 'https://gamehag.com/img/rewards/logo/fifa-20-origin-cd-key.png'}}
                            />
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.description}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: "center" }}>
                        No products much search criteria
                    </Text>
                </View>
            ) }
        </Content>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SearchedProduct;