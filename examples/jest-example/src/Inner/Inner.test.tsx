import { clearMocks, mount } from "@kaminrunde/react-firescout";
import App from "../App";
import * as rtl from "@testing-library/react";

describe("inner component test", () => {
  beforeEach(clearMocks);

  test("render inner component", async () => {
    const f = mount(<App />, rtl);
    const ctx = () => f.context("App").collection("Inner");
    ctx().handle("open-inner-secret").click();
    ctx().shouldHaveState("inner-secret-visible");
  });
});
