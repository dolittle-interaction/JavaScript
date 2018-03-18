describe("when validating with empty string", function () {
    var validator = Dolittle.validation.required.create({ options: {} });
    var result = validator.validate("");

    it("should not be valid", function () {
        expect(result).toBe(false);
    });
});