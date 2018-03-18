describe("when comparison value is null", function () {
    var exception = null;
    try {
        var validator = Dolittle.validation.greaterThan.create({ options: { value: null } });
        validator.validate("12345");
    } catch (e) {
        exception = e;
    }

    it("should throw an exception", function () {
        expect(exception instanceof Dolittle.validation.OptionsNotDefined).toBe(true);
    });
});