import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";
import { clsx } from "clsx";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SubscriptionCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
  paymentMethod,
  expanded,
  startDate,
  status,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx("sub-card", expanded ? "sub-card-expanded" : "bg-card")}
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head">
        <View className="w-12 h-12 p-2 rounded-lg flex justify-center items-center bg-muted">
          <Image source={icon} className="sub-icon w-8 h-8" />
        </View>

        <View className="sub-copy">
          <Text numberOfLines={1} className="sub-title">
            {name}
          </Text>

          <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta">
            {category?.trim() ||
              plan?.trim() ||
              (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
          </Text>
        </View>
      </View>
      <View className="sub-price-box">
        <Text className="sub-price">{formatCurrency(price, currency)}</Text>
        <Text className="sub-billing">{billing}</Text>
      </View>

      {expanded && (
        <View className="sub-body">
          {/* 1. Payment Method  */}
          <View className="sub-details" id="payment_method">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Payment Method:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {paymentMethod?.trim() || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* 2. Category/Plan   */}
          <View className="sub-details" id="category">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Category:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category?.trim() || plan?.trim() || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* 3. Start Date  */}
          <View className="sub-details" id="start_date">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Started At:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {startDate ? formatSubscriptionDateTime(startDate) : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* 4. Renewal Date  */}
          <View className="sub-details" id="renewal_date">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Renewal Date:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {renewalDate
                    ? formatSubscriptionDateTime(renewalDate)
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* 5. Status  */}
          <View className="sub-details" id="status">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Status:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {status ? formatStatusLabel(status) : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionCard;
