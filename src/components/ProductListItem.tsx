import { StyleSheet, Image, Pressable, View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Product } from "@/types";
import { Link, useSegments } from "expo-router";
import { useThemeColor } from "@hooks/useThemeColor";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  // hooks should be at the top of component
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const segments = useSegments(); // shows path
  console.log(segments);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
        <Pressable>
          <Image
            source={{ uri: product.image || defaultPizzaImage }}
            style={styles.image}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>{product.name}</ThemedText>
          <ThemedText
            style={styles.price}
            lightColor="navy"
            darkColor="lightblue"
          >
            ${product.price}
          </ThemedText>
        </Pressable>
      </Link>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
