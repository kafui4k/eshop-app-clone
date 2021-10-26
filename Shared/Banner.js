import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

var { width } = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            "https://www.howtogeek.com/wp-content/uploads/2021/01/windows_hello_hero_2.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1",
            "https://i.ytimg.com/vi/4-jBiumYmXk/maxresdefault.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmhvWg6mID_5pDw0jte--AOBycynDbUbsVA&usqp=CAU"])

            return () => {
                setBannerData([])
            }
        
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{uri: item}}
                                />
                            )
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',

    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;