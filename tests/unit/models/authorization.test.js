import authorization from "models/authorization";
import { InternalServerError } from "infra/errors";

describe("models/authorization.js", () => {
  describe(".can()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.can();
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = {
        username: "userWithoutFeatures",
      };

      expect(() => {
        authorization.can(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With unknown `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.can(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("With valid `user` and known `feature`", () => {
      const createdUser = {
        features: ["create:user"],
      };

      expect(authorization.can(createdUser, "create:user")).toBe(true);
    });
  });

  describe(".filterOutput()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.filterOutput();
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = {
        username: "userWithoutFeatures",
      };

      expect(() => {
        authorization.filterOutput(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With unknown `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.filterOutput(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("Without `resource`", () => {
      const createdUser = {
        features: ["read:user"],
      };

      expect(() => {
        authorization.filterOutput(createdUser, "read:user");
      }).toThrow(InternalServerError);
    });

    test("With valid `user`, known `feature` and `resource`", () => {
      const createdUser = {
        features: ["read:user"],
      };

      const resource = {
        id: 1,
        name: "resource",
        username: "resource",
        email: "resource@example.com",
        features: ["read:user"],
        password: "password",
        created_at: "2026-01-01T00:00:000Z",
        updated_at: "2026-01-01T00:00:000Z",
      };

      const result = authorization.filterOutput(
        createdUser,
        "read:user",
        resource,
      );

      expect(result).toEqual({
        id: 1,
        name: "resource",
        username: "resource",
        features: ["read:user"],
        created_at: "2026-01-01T00:00:000Z",
        updated_at: "2026-01-01T00:00:000Z",
      });
    });
  });
});
