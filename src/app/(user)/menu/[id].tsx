import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable} from "react-native";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@hooks/useThemeColor";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes : PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
    // receive id from dynamic path
    // must have the same name as the file name
    // filename should be [xxx]
    const { id } = useLocalSearchParams();
    const { addItem } = useCart();

    const router = useRouter();

    const product = products.find((p) => p.id.toString() === id);

    // hooks should be at the top of component
    const backgroundColor = useThemeColor(
        { light: Colors.light.background, dark: Colors.dark.background },
        'background'
    );

    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };

    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Stack.Screen options={{ title: product.name }} />

            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

            <ThemedText>Select size</ThemedText>
            <View style={styles.sizes}>
                {sizes.map(size => (
                    <Pressable 
                        onPress={() => {
                            setSelectedSize(size);
                        }}
                        style={[styles.size, {
                        backgroundColor: selectedSize === size ? 'gainsboro': 'white'
                        },
                        ]} key={size}>
                        <ThemedText style={[styles.sizeText, {
                            color: selectedSize === size ? 'black' : 'gray'
                        },

                        ]} >{size}</ThemedText> 
                    </Pressable>
                    //key must be unique
                ))}
            </View>
            

            <ThemedText style={styles.price} >${product.price}</ThemedText>
            <Button onPress={addToCart} text="Add to cart" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 'auto'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        // to align text, use the two properties below
        alignItems: 'center',
        justifyContent: 'center'
    },
    sizeText: {
        fontSize: 20,
        fontWeight: "500",
    },
});

export default ProductDetailsScreen;