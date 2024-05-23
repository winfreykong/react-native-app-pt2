import { View, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import { ThemedText } from '@/components/ThemedText';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
  // useContext is a hook
  const {items, total} = useCart();

  return (
    <View style={{ padding : 10 }}>
      <FlatList 
        data={items} 
        renderItem={({item}) => <CartListItem cartItem={item}/>} 
        contentContainerStyle={{padding: 10, gap: 10}}
      
      />

      <ThemedText style={{ marginTop: 20, fontSize: 20, fontWeight: 500 }}>Total: ${total}</ThemedText>
      <Button text='Checkout' />

      <StatusBar style={Platform.OS === "ios" ? 'light' : 'auto'} />
    </View>
  )
};

export default CartScreen;
