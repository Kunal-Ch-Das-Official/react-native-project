import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  tabs,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";

describe("HOME_USER", () => {
  it("has a non-empty name", () => {
    expect(HOME_USER.name).toBeTruthy();
    expect(typeof HOME_USER.name).toBe("string");
  });

  it("contains the expected name", () => {
    expect(HOME_USER.name).toBe("Kunal Chandra Das");
  });
});

describe("HOME_BALANCE", () => {
  it("has a numeric amount", () => {
    expect(typeof HOME_BALANCE.amount).toBe("number");
  });

  it("has a positive balance amount", () => {
    expect(HOME_BALANCE.amount).toBeGreaterThan(0);
  });

  it("has a valid ISO date string for nextRenewalDate", () => {
    const parsed = new Date(HOME_BALANCE.nextRenewalDate);
    expect(parsed.toString()).not.toBe("Invalid Date");
  });

  it("has the correct amount", () => {
    expect(HOME_BALANCE.amount).toBe(2489.48);
  });
});

describe("tabs", () => {
  it("contains exactly 4 tabs", () => {
    expect(tabs).toHaveLength(4);
  });

  it("has tab names: index, subscriptions, insights, settings", () => {
    const names = tabs.map((t) => t.name);
    expect(names).toContain("index");
    expect(names).toContain("subscriptions");
    expect(names).toContain("insights");
    expect(names).toContain("settings");
  });

  it("each tab has a name, title, and icon", () => {
    tabs.forEach((tab) => {
      expect(tab.name).toBeTruthy();
      expect(tab.title).toBeTruthy();
      expect(tab.icon).toBeDefined();
    });
  });

  it("has the correct tab titles", () => {
    const titles = tabs.map((t) => t.title);
    expect(titles).toEqual(["Home", "Subscriptions", "Insights", "Settings"]);
  });
});

describe("UPCOMING_SUBSCRIPTIONS", () => {
  it("is an array with 3 items", () => {
    expect(Array.isArray(UPCOMING_SUBSCRIPTIONS)).toBe(true);
    expect(UPCOMING_SUBSCRIPTIONS).toHaveLength(3);
  });

  it("each item has the required fields: id, name, price, currency, daysLeft, icon", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.id).toBeTruthy();
      expect(sub.name).toBeTruthy();
      expect(typeof sub.price).toBe("number");
      expect(sub.currency).toBeTruthy();
      expect(typeof sub.daysLeft).toBe("number");
      expect(sub.icon).toBeDefined();
    });
  });

  it("each item has a positive price", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.price).toBeGreaterThan(0);
    });
  });

  it("contains the Spotify subscription", () => {
    const spotify = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "spotify");
    expect(spotify).toBeDefined();
    expect(spotify!.name).toBe("Spotify");
    expect(spotify!.price).toBe(5.99);
    expect(spotify!.daysLeft).toBe(2);
  });

  it("contains the Notion subscription", () => {
    const notion = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "notion");
    expect(notion).toBeDefined();
    expect(notion!.name).toBe("Notion");
    expect(notion!.daysLeft).toBe(4);
  });

  it("contains the Figma subscription", () => {
    const figma = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "figma");
    expect(figma).toBeDefined();
    expect(figma!.name).toBe("Figma");
    expect(figma!.daysLeft).toBe(6);
  });

  it("all items use USD currency", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.currency).toBe("USD");
    });
  });

  it("all unique ids", () => {
    const ids = UPCOMING_SUBSCRIPTIONS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("HOME_SUBSCRIPTIONS", () => {
  it("is an array with 4 items", () => {
    expect(Array.isArray(HOME_SUBSCRIPTIONS)).toBe(true);
    expect(HOME_SUBSCRIPTIONS).toHaveLength(4);
  });

  it("each item has the required fields: id, name, price, billing, icon", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.id).toBeTruthy();
      expect(sub.name).toBeTruthy();
      expect(typeof sub.price).toBe("number");
      expect(sub.billing).toBeTruthy();
      expect(sub.icon).toBeDefined();
    });
  });

  it("each item has a positive price", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.price).toBeGreaterThan(0);
    });
  });

  it("contains Adobe Creative Cloud with correct data", () => {
    const adobe = HOME_SUBSCRIPTIONS.find(
      (s) => s.id === "adobe-creative-cloud",
    );
    expect(adobe).toBeDefined();
    expect(adobe!.name).toBe("Adobe Creative Cloud");
    expect(adobe!.price).toBe(77.49);
    expect(adobe!.billing).toBe("Monthly");
    expect(adobe!.status).toBe("active");
    expect(adobe!.currency).toBe("USD");
  });

  it("contains GitHub Pro with correct data", () => {
    const github = HOME_SUBSCRIPTIONS.find((s) => s.id === "github-pro");
    expect(github).toBeDefined();
    expect(github!.name).toBe("GitHub Pro");
    expect(github!.status).toBe("active");
    expect(github!.price).toBe(9.99);
  });

  it("contains Claude Pro with paused status", () => {
    const claude = HOME_SUBSCRIPTIONS.find((s) => s.id === "claude-pro");
    expect(claude).toBeDefined();
    expect(claude!.status).toBe("paused");
    expect(claude!.price).toBe(20.0);
  });

  it("contains Canva Pro with cancelled status and Yearly billing", () => {
    const canva = HOME_SUBSCRIPTIONS.find((s) => s.id === "canva-pro");
    expect(canva).toBeDefined();
    expect(canva!.status).toBe("cancelled");
    expect(canva!.billing).toBe("Yearly");
    expect(canva!.price).toBe(119.99);
  });

  it("all have valid ISO date strings for startDate and renewalDate", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      if (sub.startDate) {
        expect(new Date(sub.startDate).toString()).not.toBe("Invalid Date");
      }
      if (sub.renewalDate) {
        expect(new Date(sub.renewalDate).toString()).not.toBe("Invalid Date");
      }
    });
  });

  it("all have unique ids", () => {
    const ids = HOME_SUBSCRIPTIONS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all have a color defined", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub.color).toBeTruthy();
    });
  });

  it("statuses are one of: active, paused, cancelled", () => {
    const validStatuses = new Set(["active", "paused", "cancelled"]);
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      if (sub.status) {
        expect(validStatuses.has(sub.status)).toBe(true);
      }
    });
  });
});