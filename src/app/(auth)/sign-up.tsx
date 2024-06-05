import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  // hooks should be at the top of component
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = () => {
    router.push("/sign-in");
  };

  async function signUpWtihEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

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
          placeholder="*******"
          placeholderTextColor={"gray"}
          style={styles.input}
          secureTextEntry={true}
        />
        <Button
          onPress={signUpWtihEmail}
          disabled={loading}
          text={loading ? "Creating account..." : "Create account"}
        />
        <ThemedText onPress={signIn} style={styles.textButton}>
          Sign in
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
    backgroundColor: "#ededed",
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

export default SignUp;
