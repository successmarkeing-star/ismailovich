import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "../client/src/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds an Arabic prefilled message for the new number", () => {
    const url = buildWhatsAppUrl("ar", {
      name: "عميل تجريبي",
      phone: "0500000000",
      request: "استفسار شحن",
    });
    const parsed = new URL(url);

    expect(parsed.hostname).toBe("wa.me");
    expect(parsed.pathname).toBe("/966543749292");
    expect(decodeURIComponent(parsed.searchParams.get("text") || "")).toContain("تفاصيل الطلب: استفسار شحن");
  });

  it("builds an English prefilled message", () => {
    const url = buildWhatsAppUrl("en", {
      name: "International client",
      phone: "+971500000000",
      request: "Sourcing enquiry",
    });

    expect(decodeURIComponent(new URL(url).searchParams.get("text") || "")).toContain("Request details: Sourcing enquiry");
  });
});
