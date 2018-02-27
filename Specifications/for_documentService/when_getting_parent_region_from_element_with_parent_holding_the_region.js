﻿describe("when getting parent region from element with parent holding the region", function () {
    var service = doLittle.documentService.createWithoutScope({
        DOMRoot: {}
    });

    var region = { something: 42 };

    var parent = $("<div/>");
    var element = $("<div/>")[0];

    parent.append(element);

    parent[0].region = region;
    var regionFromElement = service.getParentRegionFor(element);

    it("should get it from the element", function () {
        expect(regionFromElement).toBe(region);
    });
});