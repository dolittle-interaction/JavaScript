describe("when matching a string with wildcard at the end", function () {
    var mapping = Dolittle.StringMapping.create({
        format: "{something}/**/",
        mappedFormat: "whatevva.**."
    });
    var result = mapping.matches("this/is/a/wildcard/uri");

    it("should match", function () {
        expect(result).toBe(true);
    });
});