describe("when matching a string that should not match", function () {
    var mapping = Dolittle.StringMapping.create({
        format: "{something}/{else}",
        mappedFormat: "whatevva"
    });
    var result = mapping.matches("hello");

    it("should not match", function () {
        expect(result).toBe(false);
    });
});