import { clearMocks, getModule, mount } from "@kaminrunde/react-firescout";
import App from "../App";
import * as rtl from "@testing-library/react";

describe("inner component test", () => {
  beforeEach(clearMocks);

  test("render inner component", async () => {
    const fixture = await getModule("App")
      .fn("fetchInner")
      .mock("default", jest.fn);

    const f = mount(<App />, rtl);
    const ctx = () => f.context("App").collection("Inner");
    ctx().handle("open-inner-secret").click();
    ctx().shouldHaveState("inner-secret-visible");

    expect(fixture).toBeCalledTimes(2);
  });
});
