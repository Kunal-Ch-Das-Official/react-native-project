import ListHeading from "@/components/ListHeading";
import { render, screen } from "@testing-library/react-native";
import React from "react";

describe("ListHeading", () => {
  it("renders the provided title text", () => {
    render(<ListHeading title="Upcoming" />);
    expect(screen.getByText("Upcoming")).toBeTruthy();
  });

  it("renders the 'See All' action button", () => {
    render(<ListHeading title="All Subscriptions" />);
    expect(screen.getByText("See All")).toBeTruthy();
  });

  it("renders different titles correctly", () => {
    render(<ListHeading title="All Subscriptions" />);
    expect(screen.getByText("All Subscriptions")).toBeTruthy();
  });

  it("renders both the title and 'See All' text simultaneously", () => {
    render(<ListHeading title="Upcoming" />);
    expect(screen.getByText("Upcoming")).toBeTruthy();
    expect(screen.getByText("See All")).toBeTruthy();
  });

  it("renders with an empty title string without crashing", () => {
    render(<ListHeading title="" />);
    expect(screen.getByText("See All")).toBeTruthy();
  });

  it("renders with a long title without crashing", () => {
    const longTitle = "A Very Long Section Title That Might Wrap";
    render(<ListHeading title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeTruthy();
  });
});