import { Stack } from "expo-router";

// wrap index and [id] so they are just one tab
export default function OrderStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
