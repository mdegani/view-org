import * as nightmare from "nightmare";

describe("The main page", function() {
  it("should show the Organization View title", async function() {
    let page = nightmare().goto("http://localhost:3000");

    let text = await page.evaluate(() => document.body.textContent).end();

    expect(text).toContain("Organization View");
  });
});
