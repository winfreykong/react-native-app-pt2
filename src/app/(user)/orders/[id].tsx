import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

const OrderDetailsScreen = () => {
  // receive id from dynamic path
  // must have the same name as the file name
  // filename should be [xxx]
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <ThemedText>Order not found</ThemedText>;
  }

  const order_items = order.order_items;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />} // so it gets scrolled altogether
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default OrderDetailsScreen;
