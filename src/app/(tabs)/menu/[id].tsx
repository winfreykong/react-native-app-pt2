import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ProductDetailsScreen = () => {
    // receive id from dynamic path
    // must have the same name as the file name
    // filename should be [xxx]
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ title: 'Details: ' + id }} />
            <Text>Product details screen for id: {id}</Text>
        </View>
    );
};

export default ProductDetailsScreen;