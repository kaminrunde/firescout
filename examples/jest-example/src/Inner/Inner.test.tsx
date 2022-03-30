import { clearMocks, getModule } from "@kaminrunde/react-firescout";
import React from "react";

describe("inner component test", () => {
  beforeEach(clearMocks);

  test("render inner component", async () => {
    const fixture = await getModule('App');
  });
});
