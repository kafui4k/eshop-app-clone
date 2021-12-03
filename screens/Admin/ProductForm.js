import React, { useState, useEffect } from "react";
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item , Picker } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-community/async-storage';
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";

const ProductForm = (props) => {

  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setErr] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [reachDescription, setReachDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {

    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
    })
    .catch((error) => {
      console.log(error);
    });

    // categoies
    axios
      .get(`${baseUrl}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error loading categories"));

      // image picker
      (async () => {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestCameraPermissionsAsync();

          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }

        }

      })();

      return () => {
        setCategories([]);
      }

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }

  }

  const addProduct = async () => {
    if (
      name == "" ||
      price == "" ||
      description == "" ||
      brand == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setErr("Please fill all fields");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", reachDescription);
    formData.append("rating", rating);
    formData.append("isFeatured", isFeatured);
    formData.append("numreviews", numReviews);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    }

    if (item !== null) {
      axios
        .put(`${baseUrl}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 50,
              type: "success",
              text1: "Product updated successfully",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error updating product",
            text2: "Please Try again",
          });
        })
    } else {
      axios
        .post(`${baseUrl}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 50,
              type: "success",
              text1: "Product added successfully",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Error adding product",
            text2: "Please Try again",
          });
        })
      }
    }

  return (

    <FormContainer
      title="Add Product"
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: mainImage }}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{  color: "white" }} name="camera" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text>Brand</Text>
      </View>
      <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangetext={(text) => setBrand(text)}
      />

      <View style={styles.label}>
        <Text>Name</Text>
      </View>
      <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangetext={(text) => setName(text)}
      />

      <View style={styles.label}>
        <Text>Price</Text>
      </View>
      <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType="numeric"
          onChangetext={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text>Stock</Text>
      </View>
      <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType="numeric"
          onChangetext={(text) => setCountInStock(text)}
      />

      <View style={styles.label}>
        <Text>Description</Text>
      </View>
      <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangetext={(text) => setDescription(text)}
      />

      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
          style={{ width: undefined }}
          placeholder="Select Category"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(value) => [setPickerValue(value), setCategory(value)]}
        >
          { categories.map((category) => {
            return <Picker.Item label={category.name} value={category.id} key={category.id} />
          })}

        </Picker>
      </Item>
      { err ? <Error message={err} /> : null }
      <View style={styles.buttonContainer}>
        <EasyButton
          large
          primary
          onpress={() => addProduct()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10.
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#007aff",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20
  }
});

export default ProductForm;