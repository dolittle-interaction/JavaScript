﻿describe("when getting region from element that has its own region", function () {
    var service = doLittle.documentService.createWithoutScope({
        DOMRoot: {}
    });

    var region = { something: 42 };
    var element = $("<div/>")[0];

    element.region = region;
    var regionFromElement = service.getRegionFor(element);

    it("should get it from the element", function () {
        expect(regionFromElement).toBe(region);
    });
});