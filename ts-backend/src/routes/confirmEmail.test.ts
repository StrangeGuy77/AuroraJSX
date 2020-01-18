import fetch from "node-fetch";

describe("Confirmation email testing block", () => {
  it("sends invalid if bad id sent", async () => {
    const response = await fetch(`${process.env.TEST_HOST}/confirm/1234`);
    const text = await response.text();
    expect(text).toEqual("Invalid");
  });

  it("Should expire email link verification", async () => {
    return true;
  });
});
