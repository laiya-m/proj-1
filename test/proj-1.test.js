import { html, fixture, expect } from '@open-wc/testing';
import "../proj-1.js";

describe("Proj1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <proj-1
        title="title"
      ></proj-1>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
