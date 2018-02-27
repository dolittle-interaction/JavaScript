﻿describe("when matching a string with only a wildcard", function () {
    var mapping = doLittle.StringMapping.create({
        format: "**/",
        mappedFormat: "**."
    });
    var result = mapping.matches("this/is/a/wildcard/uri/for_things");

    it("should match", function () {
        expect(result).toBe(true);
    });
});