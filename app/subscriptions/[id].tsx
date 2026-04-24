import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams() as { id?: string };
  return (
    <View>
      <Text>SubscriptionDetails: {id}</Text>
      <Link href="/subscriptions">Go back to subscriptions</Link>
    </View>
  );
};

export default SubscriptionDetails;
