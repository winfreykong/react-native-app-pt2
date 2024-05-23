import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

const index = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </ThemedView>
  );
};

export default index;
