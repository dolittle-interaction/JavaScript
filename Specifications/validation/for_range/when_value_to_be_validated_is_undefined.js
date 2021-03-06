describe("when value to be validated is undefined", function () {
    var validator = Dolittle.validation.range.create({ options: { min: 3, max: 10 } });
    var result = validator.validate(undefined);

    it("should not be valid", function () {
        expect(result).toBe(false);
    });
});