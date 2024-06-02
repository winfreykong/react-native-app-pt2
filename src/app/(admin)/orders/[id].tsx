import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { OrderStatusList } from "@/types";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

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
        ListFooterComponent={() => (
          <>
            <ThemedText style={{ fontWeight: "bold" }}>Status</ThemedText>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
