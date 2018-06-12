import { validate } from "../game";

describe("validation", () => {
    it("should validate this fine", () => {
        let game = {
            appId: "t3st",
            title: "test",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({ isValid: true, errors: {} });
    });

    it("should not raise error for missing appId", () => {
        let game = {
            title: "test",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({ isValid: true, errors: {} });
    });

    it("should raise error for invalid appId when present", () => {
        let game = {
            appId: "#!@#$%",
            title: "test",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: { appId: ["App id is invalid"] }
        });
    });

    it("should raise error for missing title", () => {
        let game = {
            appId: "t3st",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: { title: ["Title is required"] }
        });
    });

    it("should raise error for empty title", () => {
        let game = {
            appId: "t3st",
            title: "",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: { title: ["Title is required"] }
        });
    });

    it("should raise error for whitespace-only title", () => {
        let game = {
            appId: "t3st",
            title: " ",
            releaseDate: "20180101",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: { title: ["Title is required"] }
        });
    });

    it("should raise error for missing release date", () => {
        let game = {
            appId: "t3st",
            title: "test",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: {
                releaseDate: [
                    "Release date is required",
                    "Release date is invalid"
                ]
            }
        });
    });

    it("should raise error for invalid release date", () => {
        let game = {
            appId: "t3st",
            title: "test",
            releaseDate: "20180229",
            inLibrary: true,
            status: "played"
        };

        expect(validate(game)).toEqual({
            isValid: false,
            errors: {
                releaseDate: ["Release date is invalid"]
            }
        });
    });
});
