import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Order } from "@/types";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  // hooks should be at the top of component
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const now = dayjs();

  // Format the time difference as a human-readable string
  const timeAgo = dayjs(order.created_at).fromNow();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.row}>
        <View style={styles.info}>
          <ThemedText type="defaultSemiBold">Order #{order.id}</ThemedText>
          <ThemedText>{timeAgo}</ThemedText>
        </View>
        <ThemedText style={styles.status} type="defaultSemiBold">
          {order.status}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensure items are spaced apart
  },
  info: {
    flex: 3,
  },
  status: {
    textAlign: "right",
    flex: 1,
  },
});

export default OrderListItem;
