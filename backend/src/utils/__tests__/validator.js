import validator from "../validator";

describe("validate TDD", () => {
    it("should return true for empty data, empty rules", () => {
        expect(validator({}, {})).toEqual({ isValid: true, errors: {} });
    });

    it("should return true for non-empty data, empty rules", () => {
        expect(validator({ foo: "bar" }, {})).toEqual({
            isValid: true,
            errors: {}
        });
    });

    it("should return true for empty data, non-empty rules where field is optional", () => {
        expect(validator({}, { foo: value => value === "bar" })).toEqual({
            isValid: true,
            errors: {}
        });
    });

    it("should raise error for unrecognised rule type", () => {
        let rules = { foo: "required" };
        expect(() => validator({}, rules)).toThrow();
    });

    it("should accept function as rule and return true for passing field", () => {
        let rules = { foo: value => value === "bar" };
        expect(validator({ foo: "bar" }, rules)).toEqual({
            isValid: true,
            errors: {}
        });
    });

    it("should accept function as rule and return false for failing field", () => {
        let rules = { foo: value => value === "bar" };
        expect(validator({ foo: "barz" }, rules)).toEqual({
            isValid: false,
            errors: {
                foo: ["Foo is invalid"]
            }
        });
    });

    it("should return true if all fields pass", () => {
        let rules = {
            foo: value => value === "bar",
            bar: value => value === "foo"
        };
        expect(validator({ foo: "bar", bar: "foo" }, rules)).toEqual({
            isValid: true,
            errors: {}
        });
    });

    it("should accept array of rules and return multiple errors", () => {
        let rules = {
            foo: [value => value === "bar", value => value === "barz"]
        };
        expect(validator({ foo: "not bar" }, rules)).toEqual({
            isValid: false,
            errors: {
                foo: ["Foo is invalid", "Foo is invalid"]
            }
        });
    });

    it("should allow custom error messages", () => {
        let rules = {
            foo: { rule: value => value === "bar", message: "should be bar" }
        };
        expect(validator({ foo: "not bar" }, rules)).toEqual({
            isValid: false,
            errors: {
                foo: ["Foo should be bar"]
            }
        });
    });

    it("should prettify camelCase as Camel case", () => {
        expect(
            validator(
                { camelCase: "test" },
                {
                    camelCase: value => false
                }
            )
        ).toEqual({
            isValid: false,
            errors: {
                camelCase: ["Camel case is invalid"]
            }
        });
    });

    it("should allow option to show only first error", () => {
        expect(
            validator(
                { camelCase: "test" },
                {
                    camelCase: [value => false, value => false]
                },
                { firstOnly: true }
            )
        ).toEqual({
            isValid: false,
            errors: {
                camelCase: ["Camel case is invalid"]
            }
        });
    });
});
