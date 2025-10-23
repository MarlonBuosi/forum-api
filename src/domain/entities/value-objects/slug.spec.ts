import { describe } from "node:test";
import { expect, it } from "vitest";
import { Slug } from "./slug";


describe("Slug Value Object", () => {
  it("should create a slug from text", () => {
    const title = "An Example Title!";
    const slug = Slug.createFromText(title);

    expect(slug.value).toBe("an-example-title");
  });
});
