import images from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await signOut();

      // ✅ Always redirect after successful logout
      router.replace("/(auth)/sign-in");
    } catch (error: any) {
      console.error("Sign-out failed:", error);

      // ✅ Graceful fallback (Clerk downtime etc.)
      Alert.alert(
        "Temporary Issue",
        "Sign-out failed due to server issue. You will be logged out locally.",
      );

      // 👉 Force navigation anyway (important)
      router.replace("/(auth)/sign-in");
    } finally {
      setIsSigningOut(false);
    }
  };

  // ✅ Loading state (important for production)
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "User";

  const email = user?.emailAddresses?.[0]?.emailAddress;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-3xl font-sans-bold text-primary mb-6">
        Settings
      </Text>

      {/* User Profile */}
      <View className="auth-card mb-5">
        <View className="flex-row items-center gap-4 mb-4">
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
            className="size-16 rounded-full"
          />

          <View className="flex-1">
            <Text className="text-lg font-sans-bold text-primary">
              {displayName}
            </Text>

            {email && (
              <Text className="text-sm font-sans-medium text-muted-foreground">
                {email}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Account Info */}
      <View className="auth-card mb-5">
        <Text className="text-base font-sans-semibold text-primary mb-3">
          Account
        </Text>

        <View className="gap-2">
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-sm text-muted-foreground">Account ID</Text>

            <Text
              className="text-sm text-primary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.id ? `${user.id.slice(0, 20)}...` : "N/A"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-2">
            <Text className="text-sm text-muted-foreground">Joined</Text>

            <Text className="text-sm text-primary">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </View>
      </View>

      {/* Sign Out */}
      <Pressable
        className={`auth-button bg-destructive ${
          isSigningOut ? "opacity-50" : ""
        }`}
        onPress={handleSignOut}
        disabled={isSigningOut}
      >
        <Text className="auth-button-text text-white">
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;
