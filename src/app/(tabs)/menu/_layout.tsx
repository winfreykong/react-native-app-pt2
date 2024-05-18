import { Stack } from "expo-router";

// wrap index and [id] so they are just one tab
export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{title: 'Menu'}} />
    </Stack>);

}