import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { render, screen } from "@testing-library/react-native";
import React from "react";

const mockIcon = require("../../__mocks__/fileMock.js");

const baseProps: UpcomingSubscription = {
  id: "spotify",
  name: "Spotify",
  price: 5.99,
  currency: "USD",
  daysLeft: 2,
  icon: mockIcon,
};

describe("UpcomingSubscriptionCard", () => {
  it("renders the subscription name", () => {
    render(<UpcomingSubscriptionCard {...baseProps} />);
    expect(screen.getByText("Spotify")).toBeTruthy();
  });

  it("renders the formatted price", () => {
    render(<UpcomingSubscriptionCard {...baseProps} />);
    expect(screen.getByText("$5.99")).toBeTruthy();
  });

  it("shows 'X days left' when daysLeft is greater than 1", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={4} />);
    expect(screen.getByText("4 days left")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is exactly 1", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={1} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is 0", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={0} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is negative", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={-1} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("shows 'X days left' when daysLeft is 2", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={2} />);
    expect(screen.getByText("2 days left")).toBeTruthy();
  });

  it("shows 'X days left' for a large number of days", () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={30} />);
    expect(screen.getByText("30 days left")).toBeTruthy();
  });

  it("renders with EUR currency correctly", () => {
    render(
      <UpcomingSubscriptionCard {...baseProps} price={12.0} currency="EUR" />,
    );
    const priceText = screen.getByText(/12\.00/);
    expect(priceText).toBeTruthy();
  });

  it("renders the price without currency arg (defaults to USD)", () => {
    render(
      <UpcomingSubscriptionCard {...baseProps} currency={undefined} price={15} />,
    );
    expect(screen.getByText("$15.00")).toBeTruthy();
  });

  it("renders different subscription names correctly", () => {
    render(<UpcomingSubscriptionCard {...baseProps} name="Notion" />);
    expect(screen.getByText("Notion")).toBeTruthy();
  });

  it("renders price for a zero-price subscription", () => {
    render(<UpcomingSubscriptionCard {...baseProps} price={0} />);
    expect(screen.getByText("$0.00")).toBeTruthy();
  });
});