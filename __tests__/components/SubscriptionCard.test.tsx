import SubscriptionCard from "@/components/SubscriptionCard";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

const mockIcon = require("../../__mocks__/fileMock.js");

const baseProps: SubscriptionCardProps = {
  name: "Spotify",
  price: 9.99,
  currency: "USD",
  icon: mockIcon,
  billing: "Monthly",
  expanded: false,
  onPress: jest.fn(),
};

const expandedProps: SubscriptionCardProps = {
  ...baseProps,
  expanded: true,
  category: "Music",
  plan: "Individual",
  paymentMethod: "Visa ending in 1234",
  startDate: "2025-01-01T10:00:00.000Z",
  renewalDate: "2026-01-01T10:00:00.000Z",
  status: "active",
};

describe("SubscriptionCard (collapsed)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the subscription name", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText("Spotify")).toBeTruthy();
  });

  it("renders the formatted price with billing period", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText("$9.99")).toBeTruthy();
    expect(screen.getByText("Monthly")).toBeTruthy();
  });

  it("calls onPress when the card is pressed", () => {
    const onPress = jest.fn();
    render(<SubscriptionCard {...baseProps} onPress={onPress} />);
    fireEvent.press(screen.getByText("Spotify"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not render expanded details when collapsed", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.queryByText("Payment Method:")).toBeNull();
    expect(screen.queryByText("Category:")).toBeNull();
    expect(screen.queryByText("Started At:")).toBeNull();
    expect(screen.queryByText("Renewal Date:")).toBeNull();
    expect(screen.queryByText("Status:")).toBeNull();
  });

  it("shows category in sub-meta when category is provided", () => {
    render(
      <SubscriptionCard {...baseProps} category="Music" plan="Individual" />,
    );
    // category takes precedence over plan in meta display
    expect(screen.getByText("Music")).toBeTruthy();
  });

  it("falls back to plan when category is not provided", () => {
    render(<SubscriptionCard {...baseProps} plan="Developer" />);
    expect(screen.getByText("Developer")).toBeTruthy();
  });

  it("falls back to formatted renewalDate when neither category nor plan is provided", () => {
    render(
      <SubscriptionCard
        {...baseProps}
        category={undefined}
        plan={undefined}
        renewalDate="2026-03-20T10:00:00.000Z"
      />,
    );
    expect(screen.getByText("03/20/2026")).toBeTruthy();
  });

  it("renders with Yearly billing period correctly", () => {
    render(<SubscriptionCard {...baseProps} billing="Yearly" price={119.99} />);
    expect(screen.getByText("$119.99")).toBeTruthy();
    expect(screen.getByText("Yearly")).toBeTruthy();
  });
});

describe("SubscriptionCard (expanded)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all expanded detail labels", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Payment Method:")).toBeTruthy();
    expect(screen.getByText("Category:")).toBeTruthy();
    expect(screen.getByText("Started At:")).toBeTruthy();
    expect(screen.getByText("Renewal Date:")).toBeTruthy();
    expect(screen.getByText("Status:")).toBeTruthy();
  });

  it("renders the payment method value when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Visa ending in 1234")).toBeTruthy();
  });

  it("renders the category value when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    // Category appears in both meta and expanded detail
    expect(screen.getAllByText("Music").length).toBeGreaterThan(0);
  });

  it("renders the formatted start date when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    // startDate: "2025-01-01T10:00:00.000Z" → "01/01/2025"
    expect(screen.getByText("01/01/2025")).toBeTruthy();
  });

  it("renders the formatted renewal date when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    // renewalDate: "2026-01-01T10:00:00.000Z" → "01/01/2026"
    expect(screen.getAllByText("01/01/2026").length).toBeGreaterThan(0);
  });

  it("renders the capitalized status when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Active")).toBeTruthy();
  });

  it("shows N/A for missing paymentMethod when expanded", () => {
    render(
      <SubscriptionCard
        {...expandedProps}
        paymentMethod={undefined}
      />,
    );
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("shows N/A for missing category and plan when expanded", () => {
    render(
      <SubscriptionCard
        {...expandedProps}
        category={undefined}
        plan={undefined}
      />,
    );
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("shows N/A for missing startDate when expanded", () => {
    render(
      <SubscriptionCard {...expandedProps} startDate={undefined} />,
    );
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("shows N/A for missing renewalDate when expanded", () => {
    render(
      <SubscriptionCard {...expandedProps} renewalDate={undefined} />,
    );
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("shows N/A for missing status when expanded", () => {
    render(<SubscriptionCard {...expandedProps} status={undefined} />);
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("calls onPress when the expanded card is pressed", () => {
    const onPress = jest.fn();
    render(<SubscriptionCard {...expandedProps} onPress={onPress} />);
    fireEvent.press(screen.getByText("Spotify"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders 'paused' status as 'Paused' when expanded", () => {
    render(<SubscriptionCard {...expandedProps} status="paused" />);
    expect(screen.getByText("Paused")).toBeTruthy();
  });

  it("renders 'cancelled' status as 'Cancelled' when expanded", () => {
    render(<SubscriptionCard {...expandedProps} status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeTruthy();
  });

  it("uses plan as fallback in category detail when category is missing", () => {
    render(
      <SubscriptionCard
        {...expandedProps}
        category={undefined}
        plan="Pro Plan"
      />,
    );
    expect(screen.getAllByText("Pro Plan").length).toBeGreaterThan(0);
  });
});