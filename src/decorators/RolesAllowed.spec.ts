import { PlatformTest } from "@tsed/common";
import { RolesAllowed } from "./RolesAllowed";

describe("RolesAllowed", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<RolesAllowed>(RolesAllowed);
    // const instance = PlatformTest.invoke<RolesAllowed>(RolesAllowed); // get fresh instance

    expect(instance).toBeInstanceOf(RolesAllowed);
  });
});
