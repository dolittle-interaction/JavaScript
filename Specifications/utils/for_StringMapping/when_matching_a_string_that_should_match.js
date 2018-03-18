describe("when matching a string that should match", function () {
    var mapping = Dolittle.StringMapping.create({
        format: "{something}/{else}",
        mappedFormat: "whatevva"
    });
    var result = mapping.matches("hello/there");

    it("should match", function () {
        expect(result).toBe(true);
    });
});