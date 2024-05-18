import { StyleSheet, Image, Pressable} from 'react-native';
import { ThemedText } from '@components/ThemedText';
import { ThemedView } from '@components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
  <Link href={`/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image 
        source={{uri: product.image || defaultPizzaImage}} 
        style={styles.image}
        resizeMode='contain'
        />
      <ThemedText style={styles.title}>{product.name}</ThemedText>
      <ThemedText style={styles.price}>${product.price}</ThemedText>
      
    </Pressable>
  </Link>
    );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio:  1,
  }
});
