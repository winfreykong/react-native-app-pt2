import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { OrderItem } from "@/types";
import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
import { defaultPizzaImage } from "./ProductListItem";

dayjs.extend(relativeTime);

type OrderItemListItemProps = {
  orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const segments = useSegments();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={{ uri: orderItem.products.image || defaultPizzaImage }}
        style={styles.image}
      />
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">
          {orderItem.products.name}
        </ThemedText>
        <View style={styles.details}>
          <ThemedText style={styles.price}>
            ${orderItem.products.price}
          </ThemedText>
          <ThemedText>Size: {orderItem.size}</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.status} type="defaultSemiBold">
        {orderItem.quantity}
      </ThemedText>
    </View>
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
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  details: {
    flexDirection: "row",
    gap: 5,
  },
  price: {
    fontWeight: "800",
    color: Colors.light.tint,
  },
  status: {
    textAlign: "right",
    alignSelf: "center",
  },
});

export default OrderItemListItem;
