import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "@/types";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const segments = useSegments();
  const timeAgo = dayjs(order.created_at).fromNow();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable>
        <View style={[styles.container, { backgroundColor }]}>
          <View style={styles.info}>
            <ThemedText type="defaultSemiBold">Order #{order.id}</ThemedText>
            <ThemedText>{timeAgo}</ThemedText>
          </View>
          <ThemedText style={styles.status} type="defaultSemiBold">
            {order.status}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  status: {
    textAlign: "right",
    alignSelf: "center",
  },
});

export default OrderListItem;
