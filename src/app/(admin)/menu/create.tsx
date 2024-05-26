import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = (props) => {
  // hooks should be at the top of component
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  // need to define a control group to take the text input
  // want to bind these to TextInput using value and onChangeText
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams(); // get id from [id] when editting item
  const isUpdating = !!id;

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Creating product: ", name);

    // save in database

    resetFields();
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Updating product: ", name);

    // save in database

    resetFields();
  };

  const onSubmit = () => {
    if (isUpdating) {
      // call update function
      onUpdateCreate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    console.warn("DELETE!!!!!!!!!!!!!!!!");
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Edit Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <ThemedText onPress={pickImage} style={styles.textButton}>
        Select Image
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={[styles.label, { color }]}>
        Name
      </ThemedText>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={[styles.input]}
      />

      <ThemedText type="defaultSemiBold" style={[styles.label, { color }]}>
        Price ($)
      </ThemedText>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={[styles.input]}
        keyboardType="numeric"
      />

      <ThemedText style={{ color: "red" }}>{errors}</ThemedText>

      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <ThemedText onPress={confirmDelete} style={styles.textButton}>
          Delete
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    color: "black",
  },
  label: {
    color: "gray",
    fontSize: 16,
    marginLeft: 10,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default CreateProductScreen;
