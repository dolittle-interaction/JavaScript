describe("when validating with zero integer", function () {
    var validator = Dolittle.validation.required.create({ options: {} });
    var result = validator.validate(0);

    it("should not be valid", function () {
        expect(result).toBe(false);
    });
});