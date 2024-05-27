import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const SignIn = () => {
  // hooks should be at the top of component
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const router = useRouter();

  const signUp = () => {
    router.push("/sign-up");
  };

  const validateInput = () => {
    setErrors("");

    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!password) {
      setErrors("Password is required");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setPassword("");
    setEmail("");
  };

  const signIn = () => {
    if (!validateInput()) {
      return;
    }
    // do something
    resetFields();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <ThemedText type="defaultSemiBold" style={[styles.label, { color }]}>
          Email
        </ThemedText>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="johndoe@gmail.com"
          placeholderTextColor={"gray"}
          style={styles.input}
        />

        <ThemedText type="defaultSemiBold" style={[styles.label, { color }]}>
          Password
        </ThemedText>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="***"
          placeholderTextColor={"gray"}
          style={styles.input}
          secureTextEntry={true}
        />
        <ThemedText style={{ color: "red", marginLeft: 10 }}>
          {errors}
        </ThemedText>
        <Button onPress={signIn} text="Sign in" />
        <ThemedText onPress={signUp} style={styles.textButton}>
          Create an account
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
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

export default SignIn;
