describe("when value to be validated is not a string", function () {
    var exception = null;
    try {
        var validator = Dolittle.validation.regex.create({ options: { expression: "[abc]" } });
        validator.validate({});
    } catch (e) {
        exception = e;
    }

    it("should throw not a string exception", function () {
        expect(exception instanceof Dolittle.validation.NotAString).toBe(true);
    });
});