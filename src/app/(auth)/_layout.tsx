import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

// wrap index and [id] so they are just one tab
export default function AuthStack() {
  const { session } = useAuth();

  // automatically redirected to home page after signing in
  // this is a form of group protection
  // so user cannot go back to the sign in page

  if (session) {
    return <Redirect href={"/"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign up" }} />
    </Stack>
  );
}
