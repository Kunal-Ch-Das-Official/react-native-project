import RootLayout from "@/app/_layout";
import { render } from "@testing-library/react-native";
import React from "react";

// jest.mock is hoisted, so factory functions must not reference variables declared below them.
// We use module-level references through require() to configure mock return values.

const mockUseFonts = jest.fn().mockReturnValue([true]);
jest.mock("expo-font", () => ({
  useFonts: (...args: unknown[]) => mockUseFonts(...args),
}));

const mockHideAsync = jest.fn();
jest.mock("expo-router", () => ({
  SplashScreen: {
    hideAsync: (...args: unknown[]) => mockHideAsync(...args),
    preventAutoHideAsync: jest.fn(),
  },
  Stack: () => null,
}));

describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFonts.mockReturnValue([true]);
  });

  it("renders without crashing when fonts are loaded", () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it("calls SplashScreen.hideAsync when fonts are loaded", () => {
    render(<RootLayout />);
    expect(mockHideAsync).toHaveBeenCalledTimes(1);
  });

  it("returns null when fonts are not yet loaded", () => {
    mockUseFonts.mockReturnValue([false]);
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeNull();
  });

  it("does not call SplashScreen.hideAsync when fonts are not loaded", () => {
    mockUseFonts.mockReturnValue([false]);
    render(<RootLayout />);
    expect(mockHideAsync).not.toHaveBeenCalled();
  });

  it("calls useFonts with the six PlusJakartaSans font variants", () => {
    render(<RootLayout />);
    expect(mockUseFonts).toHaveBeenCalledWith(
      expect.objectContaining({
        "sans-regular": expect.anything(),
        "sans-bold": expect.anything(),
        "sans-medium": expect.anything(),
        "sans-semibold": expect.anything(),
        "sans-extrabold": expect.anything(),
        "sans-light": expect.anything(),
      }),
    );
  });
});