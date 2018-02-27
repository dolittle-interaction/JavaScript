﻿describe("when getting values from placeholders", function () {
    var expectedResult = "Say/hello/to/mr.potatohead";
    var mapping = doLittle.StringMapping.create({
        format: "{something}/{else}",
        mappedFormat: "Say/{else}/to/{something}"
    });
    var result = mapping.getValues("mr.potatohead/hello");

    it("should contain the something placeholder", function () {
        expect(result.something).toBe("hello");
    });
});