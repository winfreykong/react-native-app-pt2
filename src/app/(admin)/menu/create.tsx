import { View, Text, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

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

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onCreate = () => {
    console.warn("Creating product: ", name);

    // save in database

    resetFields();
  };

  return (
    <ThemedView style={styles.container}>
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

      <Button onPress={onCreate} text="Create" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
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
});
export default CreateProductScreen;
