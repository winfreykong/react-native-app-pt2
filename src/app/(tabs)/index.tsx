import { StyleSheet, Image, Text, View} from 'react-native';
import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';
import products from '../../../assets/data/products';

const product = products[0];

const productListItem = () => {
  return (
    <ThemedView style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image}/>
      <ThemedText style={styles.title}>{product.name}</ThemedText>
      <ThemedText style={styles.price}>${product.price}</ThemedText>
    </ThemedView>
    );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image}/>
      <ThemedText style={styles.title}>{product.name}</ThemedText>
      <ThemedText style={styles.price}>${product.price}</ThemedText>
    </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    borderRadius: 10,
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
