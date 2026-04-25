import "@testing-library/jest-native/extend-expect";

// Mock nativewind styled utility
jest.mock("nativewind", () => ({
  styled: (component: unknown) => component,
  useColorScheme: () => ({ colorScheme: "light" }),
}));

// Mock global.css imports
jest.mock("@/global.css", () => {}, { virtual: true });

// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true],
  loadAsync: jest.fn(),
}));

// Mock expo-router SplashScreen
jest.mock("expo-router", () => ({
  SplashScreen: {
    hideAsync: jest.fn(),
    preventAutoHideAsync: jest.fn(),
  },
  Stack: ({ children }: { children?: React.ReactNode }) => children ?? null,
  Link: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: View,
    SafeAreaProvider: View,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});